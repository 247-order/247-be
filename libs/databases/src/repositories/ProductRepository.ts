import { paginate } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findProductByUser(userId, paginationParams){
    const queryBuilder = this.createQueryBuilder('product');
    queryBuilder.where('product.user_id = :userId', { userId });

    return paginate<Product>(queryBuilder, paginationParams);
  }
}
