import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Category } from './Category';
import { User } from './User';

export enum ProductSource {
  sTAOBAO = 'TAOBAO',
  s1688 = '1688',
  sPINDUODUO = 'PINDUODUO'
}

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'name', type: 'varchar', length: '60', unique: true })
  @Index('IDX_PRODUCT_NAME', { unique: true })
  productName: string;

  @ApiProperty()
  @Column({ name: 'sku', type: 'varchar', length: '60', unique: true })
  @Index('IDX_PRODUCT_SKU', { unique: true })
  productSKU: string;

  @ApiProperty()
  @Column({ name: 'quantity', type: 'int', width: 20 })
  quantity: number;

  @ApiProperty()
  @Column({ name: 'original_source', type: 'varchar', length: '128'})
  originalSource: ProductSource;

  @ApiProperty()
  @Column({ name: 'original_url', type: 'varchar', length: '128'})
  originalUrl: string;

  @ApiProperty()
  @Column({ name: 'note', type: 'varchar', length: '1000'})
  note: string;

  @ApiProperty()
  @Column({ name: 'image', type: 'varchar', length: '256', nullable: true })
  productImage: string;

  @ApiProperty()
  @Column({ name: 'price', type: 'float', width: 20 })
  productPrice: number;

  @ApiProperty()
  @Column({ name: 'price_vnd', type: 'float', width: 20 })
  productPriceVnd: number;

  @ApiProperty()
  @Column({ name: 'special_price', type: 'float', width: 20, nullable: true })
  productSpecialPrice: number;

  @Column({ name: 'visible', type: 'boolean', default: true })
  visible: boolean;

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];

  @ManyToOne(() => User, (user) => user.products, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
