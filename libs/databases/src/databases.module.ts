import { DynamicModule, Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { MysqlModule } from './mysql/mysql.module';

@Module({
  // providers: [DatabasesService],
  // exports: [DatabasesService],
  // imports: [MysqlModule],
})
export class DatabasesModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: DatabasesModule,
      providers: [DatabasesService],
      exports: [DatabasesService],
    };
  }
}
