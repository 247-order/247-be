import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@samec/databases/entities/Profile';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @Length(6, 20)
  userName: string;

  @ApiProperty()
  @IsEmail()
  @Length(6, 60)
  email: string;

  @ApiProperty()
  @IsString()
  @Length(6, 20)
  password: string;

  @ApiProperty()
  @IsString()
  @Length(6, 60)
  fullName: string;

  @ApiProperty()
  @IsPhoneNumber('vi')
  phone: string;

  @ApiProperty()
  @IsString()
  @Length(6, 128)
  address: string;
}
