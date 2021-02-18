import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MYSQL_MAIN_CONNECTION } from '@samec/databases/constants/db.constants';
import { User } from '@samec/databases/entities/User';
import { UserRepository } from '@samec/databases/repositories/UserRepository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  ERROR__USER__USER_NAME_ALREADY_EXIST,
  ERROR__USER__USER_EMAIL_ALREADY_EXIST,
} from '@samec/databases/constants/error.constants';
import { RegisterDto } from './dto/register.dto';
import { Profile } from '@samec/databases/entities/Profile';
import { ProfileRepository } from '@samec/databases/repositories/ProfileRepository';

@Injectable()
export class AuthService {
  @InjectRepository(User, MYSQL_MAIN_CONNECTION)
  private readonly usersRepository: UserRepository;

  @InjectRepository(Profile, MYSQL_MAIN_CONNECTION)
  private readonly profileRepository: ProfileRepository;

  constructor(private jwtService: JwtService) {}

  async login(userName: string, password: string) {
    const user = await this.usersRepository.findOne(
      { userName },
      { select: ['userName', 'password', 'id'] },
    );

    if (!user)
      throw new HttpException(
        `User "${userName}" not found`,
        HttpStatus.NOT_FOUND,
      );

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);

    const payload = { userName, id: user.id };

    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  // getInfo() {}

  async register(createUserDto: RegisterDto): Promise<User> {
    const { userName, email } = createUserDto;
    try {
      if (await this.usersRepository.findOne({ userName }))
        throw new BadRequestException(ERROR__USER__USER_NAME_ALREADY_EXIST);
      if (await this.usersRepository.findOne({ email }))
        throw new BadRequestException(ERROR__USER__USER_EMAIL_ALREADY_EXIST);

      const userData = this.usersRepository.create(createUserDto);
      const profileData = this.profileRepository.create(createUserDto.profile);

      profileData.user = userData;

      const createdProfile = await this.profileRepository.save(profileData);
      return createdProfile.user;
    } catch (e: any) {
      throw new BadRequestException(e.message);
    }
  }

  // resetPassword() {}
}
