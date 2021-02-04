import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { MysqlModule } from './mysql/mysql.module';

@Module({
  providers: [DatabasesService],
  exports: [DatabasesService],
  imports: [MysqlModule],
})
export class DatabasesModule {}
