import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MYSQL_MAIN_CONNECTION } from '@samec/databases/constants/db.constants';
import { Product } from '@samec/databases/entities/Product';
import { ProductRepository } from '@samec/databases/repositories/ProductRepository';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  @InjectRepository(Product, MYSQL_MAIN_CONNECTION)
  private readonly productRepository: ProductRepository;

  async create(createProductDto: CreateProductDto, user): Promise<Product> {
    let createdProd;
    try {
      createdProd = await this.productRepository.save({ ...createProductDto, user: user.userId });
    } catch (e: any) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }

    return createdProd;
  }

  async findAll(user, paginationParams: IPaginationOptions) {
    return this.productRepository.findProductByUser(user.userId, paginationParams)
  }

  findOne(id: number) {
    return this.productRepository.findOne({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return this.productRepository.delete(id)
  }
}
