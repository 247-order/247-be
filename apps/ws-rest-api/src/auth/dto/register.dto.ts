import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@samec/databases/entities/Profile';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

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
  @IsOptional()
  profile: Profile;
}
