import { CacheModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@samec/databases/repositories/UserRepository';
import { MYSQL_MAIN_CONNECTION } from '@samec/databases/constants/db.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository], MYSQL_MAIN_CONNECTION),
    CacheModule.register({
      ttl: 5, // seconds
      max: 10000, // maximum number of items in cache
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
