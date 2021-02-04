import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(6, 20)
  userName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(6, 20)
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(6, 20)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @Length(6, 60)
  email: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  dob: Date;

  @ApiProperty()
  @IsString()
  @Length(6, 20)
  password: string;
}
