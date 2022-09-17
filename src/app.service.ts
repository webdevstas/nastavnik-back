import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Connection, DataSource, Repository} from 'typeorm';
import {Student} from './entities/student.entity';
import {stringify} from 'querystring'

require('dotenv').config();
import * as fetch from 'node-fetch' ;
import {Ip} from "./entities/ip.entity";

const SMARTCAPTCHA_SERVER_KEY = process.env.SMARTCAPTCHA_SERVER_KEY;
const validateUrl = 'https://captcha-api.yandex.ru/validate?'

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Student)
        private readonly repo: Repository<Student>,
        @InjectRepository(Ip)
        private readonly ipRepo: Repository<Ip>
    ) {
    }

    async getVotes(): Promise<Array<Student>> {
        return await this.repo.find();
    }

    async getVoteById(id: number): Promise<Student[]> {
        return await this.repo.findBy({id});
    }

    async makeVote(id: number, token: string, ip: string) {
        await this.checkIfIpExists(ip);
        await this.checkCaptcha(token, ip);
        return await this.repo.increment({id}, 'votesNumber', 1);
    }

    async checkCaptcha(token: string, ip): Promise<void> {
        const url = validateUrl + stringify({
            secret: SMARTCAPTCHA_SERVER_KEY,
            token,
            ip
        });
        const response = await fetch(url);
        const result = await response.json();
        if (result.status !== 'ok') {
            throw new HttpException('Ошибка прохождения капчи, попробуйте снова', 400);
        }
    }

    async checkIfIpExists(ip: string): Promise<void> {
        await this.ipRepo.manager.transaction(async (transactionEntityManager) => {
            const find = await transactionEntityManager.find<Ip>(Ip, {where: {ip}});
            if (!find.length) {
                const entity = new Ip();
                entity.ip = ip;
                await transactionEntityManager.insert<Ip>(Ip, entity);
                return;
            }
            throw new HttpException('Вы уже проголосовали', 400);
        });
    }
}
