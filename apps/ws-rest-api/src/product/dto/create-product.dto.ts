import { ApiProperty } from "@nestjs/swagger";
import { ProductSource } from "@samec/databases/entities/Product";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 128)
  productName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  productSKU: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;

  @ApiProperty({enum: ProductSource})
  @IsNotEmpty()
  @IsString()
  originalSource: ProductSource;

  @ApiProperty()
  @IsString()
  @IsOptional()
  note: string

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  @Length(6, 256)
  productImage: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productPriceVnd: number;
}
