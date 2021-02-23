import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from '@samec/databases/repositories/ProductRepository';
import { MYSQL_MAIN_CONNECTION } from '@samec/databases/constants/db.constants';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductRepository], MYSQL_MAIN_CONNECTION)
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
