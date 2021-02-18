import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Category } from './Category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: '60', unique: true })
  @Index('IDX_PRODUCT_NAME', { unique: true })
  productName: string;

  @Column({ name: 'sku', type: 'varchar', length: '60', unique: true })
  @Index('IDX_PRODUCT_SKU', { unique: true })
  productSKU: string;

  @Column({ name: 'quantity', type: 'float', width: 20 })
  quantity: number;

  @Column({ name: 'image', type: 'varchar', length: '128', nullable: true })
  productImage: string;

  @Column({ name: 'price', type: 'float', width: 20 })
  productPrice: number;

  @Column({ name: 'special_price', type: 'float', width: 20, nullable: true })
  productSpecialPrice: number;

  @Column({ name: 'visible', type: 'boolean', default: true })
  visible: boolean;

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
