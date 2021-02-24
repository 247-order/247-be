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
import { Address } from '@samec/databases/entities/Address';
import { AddressRepository } from '@samec/databases/repositories/AddressRepository';

@Injectable()
export class AuthService {
  @InjectRepository(User, MYSQL_MAIN_CONNECTION)
  private readonly usersRepository: UserRepository;

  @InjectRepository(Profile, MYSQL_MAIN_CONNECTION)
  private readonly profileRepository: ProfileRepository;

  @InjectRepository(Address, MYSQL_MAIN_CONNECTION)
  private readonly addressRepository: AddressRepository;

  constructor(private jwtService: JwtService) { }

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
    const { userName, email, fullName, address, phone } = createUserDto;
    try {
      if (await this.usersRepository.findOne({ userName }))
        throw new BadRequestException(ERROR__USER__USER_NAME_ALREADY_EXIST);
      if (await this.usersRepository.findOne({ email }))
        throw new BadRequestException(ERROR__USER__USER_EMAIL_ALREADY_EXIST);

      const savedUser = await this.usersRepository.save(this.usersRepository.create(createUserDto))
      const savedProfile = await this.profileRepository.save(this.profileRepository.create({ fullName, user: savedUser, phone }));
      const savedAddress = await this.addressRepository.save(this.addressRepository.create({ description: address, default: true, profile: savedProfile }))

      return savedUser;
    } catch (e: any) {
      throw new BadRequestException(e.message);
    }
  }

  async getUserInfo(userId: number) {
    const user = await this.usersRepository.findOneOrFail(userId)
    const profile = await user.profile
    const address = await profile.address

    return user
  }

  // resetPassword() {}
}
