import { Controller, Get, Post, Body, Put, Param, Delete, Request, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Product } from '@samec/databases/entities/Product';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('product')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Product,
  })
  async create(@Body() createProductDto: CreateProductDto, @Request() req): Promise<Product> {
    return await this.productService.create(createProductDto, req.user);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'List products',
    type: Pagination,
  })
  findAll(
    @Request() req,
    @Query() query: PaginationDto
  ): Promise<Pagination<Product>> {
    const { user } = req
    const paginationParams: IPaginationOptions = {
      page: query.page,
      limit: query.limit,
      route: query.route,
    }

    return this.productService.findAll(user, paginationParams);
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Product,
  })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
