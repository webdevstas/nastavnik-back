import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Student } from './entities/student.entity';
import { Response } from 'express';

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
  async makeVote(@Body() body: { id: number }) {
    return await this.appService.makeVote(body.id);
  }

  @Get('make-vote')
  async makeGetVote(@Res({ passthrough: true }) res: Response, @Param('id') id: string) {
    res.cookie('vote', 'true');
    return await this.appService.makeVote(+id);
  }
}
