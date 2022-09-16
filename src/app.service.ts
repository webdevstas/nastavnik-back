import {HttpException, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Student} from './entities/student.entity';
import {stringify} from 'querystring'
require('dotenv').config();
import * as fetch from 'node-fetch' ;

const SMARTCAPTCHA_SERVER_KEY = process.env.SMARTCAPTCHA_SERVER_KEY;
const validateUrl = 'https://captcha-api.yandex.ru/validate?'

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Student)
        private readonly repo: Repository<Student>
    ) {
    }

    async getVotes(): Promise<Array<Student>> {
        return await this.repo.find()
    }

    async getVoteById(id: number): Promise<Student[]> {
        return await this.repo.findBy({id})
    }

    async makeVote(id: number, token: string, ip: string) {
        const captchaResult = this.checkCaptcha(token, ip);

        if (captchaResult) {
            return await this.repo.increment({id}, 'votesNumber', 1);
        }

        throw new HttpException('Captcha check failed', 400);
    }

    async checkCaptcha(token: string, ip): Promise<boolean> {
        const url = validateUrl + stringify({
            secret: SMARTCAPTCHA_SERVER_KEY,
            token,
            ip
        });
        const response = await fetch(url);
        const result = await response.json();
        return result.status === 'ok';
    }
}
