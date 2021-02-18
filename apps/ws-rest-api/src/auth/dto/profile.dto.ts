import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export class ProfileDto {
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
  @IsDateString()
  @IsOptional()
  dob: Date;

  @ApiProperty()
  @IsPhoneNumber('vi')
  phone: Date;
}
