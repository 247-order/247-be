import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';
import { MYSQL_MAIN_CONNECTION } from '@samec/databases/constants/db.constants';
import { User } from '@samec/databases/entities/User';
import { UserRepository } from '@samec/databases/repositories/UserRepository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  @InjectRepository(User, MYSQL_MAIN_CONNECTION)
  private readonly usersRepository: UserRepository;

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  private saltOrRounds = 10;

  private cacheAllUser = 'USER_ALL';

  async create(createUserDto: CreateUserDto) {
    let createdUser;
    try {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        this.saltOrRounds,
      );

      createdUser = await this.usersRepository.insert(createUserDto);
    } catch (e: any) {
      console.log(e);

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }

    return createdUser;
  }

  async findAll(): Promise<User[]> {
    const cached = await this.cacheManager.get(this.cacheAllUser);

    if (cached) return cached;

    const users = await this.usersRepository.find();
    await this.cacheManager.set(this.cacheAllUser, users, { ttl: 5 });

    return users;
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOne(id);
  }

  remove(id: number) {
    return this.usersRepository.softDelete(id);
  }
}
