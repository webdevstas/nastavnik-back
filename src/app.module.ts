import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'nastavnik',
    entities: [Student],
    migrations: ['migrations/'],
    synchronize: true,
    migrationsTableName: "custom_migration_table"
  }),
  TypeOrmModule.forFeature([Student])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
