import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MYSQL_MAIN_CONNECTION } from '@samec/databases/constants/db.constants';
import { UserRepository } from '@samec/databases/repositories/UserRepository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserRepository], MYSQL_MAIN_CONNECTION),
    CacheModule.register({
      ttl: 5, // seconds
      max: 10000, // maximum number of items in cache
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
