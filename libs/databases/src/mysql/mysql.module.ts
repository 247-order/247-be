import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MYSQL_MAIN_CONNECTION } from '../constants/db.constants';
import entities from '../entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: MYSQL_MAIN_CONNECTION,
      type: 'mariadb',
      host: process.env.MARIADB_HOST,
      port: 3306,
      username: 'samec',
      password: 'samec@110320!',
      database: 'samec',
      entities: [...entities],
      // debug: true,
      synchronize: true,
    }),
  ],
})
export class MysqlModule {}
