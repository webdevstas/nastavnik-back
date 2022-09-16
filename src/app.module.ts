import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from './entities/student.entity';
require('dotenv').config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PWD,
    database: process.env.PG_DB,
    entities: [Student],
    migrations: ['migrations/'],
    synchronize: true
  }),
  TypeOrmModule.forFeature([Student])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
