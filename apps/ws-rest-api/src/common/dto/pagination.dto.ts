import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PaginationDto{

  @ApiProperty()
  @IsNotEmpty()
  page: number = 1

  @ApiProperty()
  @IsNotEmpty()
  limit: number = 10

  @ApiProperty()
  // @IsString()
  @IsOptional()
  route: string
}