import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request } from 'express'
import { AppService } from './app.service';
import { Student } from './entities/student.entity';

@Controller('votes')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getVotes(): Promise<Array<Student>> {
    return await this.appService.getVotes();
  }

  @Get('by-id/:id')
  async getById(
    @Param('id') id: number
  ): Promise<Student> {
    const [result] = await this.appService.getVoteById(id);
    return result;
  }

  @Post()
  async makeVote(@Body() body: { id: number, token: string }, @Req() req: Request) {
    const [ip] = req.headers['X-Real-IP'] ?? [];
    return await this.appService.makeVote(body.id, body.token, ip);
  }
}
