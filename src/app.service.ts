import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Student)
    private readonly repo: Repository<Student>
  ) { }

  async getVotes(): Promise<Array<Student>> {
    return await this.repo.find()
  }

  async getVoteById(id: number): Promise<Student[]> {
    return await this.repo.findBy({ id })
  }

  async makeVote(id: number) {
    return await this.repo.increment({ id }, 'votesNumber', 1);
  }
}
