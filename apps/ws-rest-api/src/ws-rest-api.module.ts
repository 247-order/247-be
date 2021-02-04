import { Module } from '@nestjs/common';
import { WsRestApiController } from './ws-rest-api.controller';
import { WsRestApiService } from './ws-rest-api.service';
import { UsersModule } from './users/users.module';
import { MysqlModule } from '@samec/databases/mysql/mysql.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MysqlModule, UsersModule, AuthModule],
  controllers: [WsRestApiController],
  providers: [WsRestApiService],
})
export class WsRestApiModule {}
