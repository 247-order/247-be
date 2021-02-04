import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MYSQL_MAIN_CONNECTION } from '@samec/databases/constants/db.constants';
import { User } from '@samec/databases/entities/User';
import { UserRepository } from '@samec/databases/repositories/UserRepository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  @InjectRepository(User, MYSQL_MAIN_CONNECTION)
  private readonly usersRepository: UserRepository;

  async login(userName: string, password: string) {
    const user = await this.usersRepository.findOne({ userName }, { select: ['userName', 'password'] });

    if (!user) throw new HttpException(`User "${userName}" not found`, HttpStatus.NOT_FOUND)

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new HttpException('Wrong password', HttpStatus.NOT_FOUND)

    return await this.usersRepository.findOne({ userName });
  }

  getInfo() { }

  register() { }

  resetPassword() { }

}
