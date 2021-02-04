import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

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

  @Column({ name: 'image', type: 'varchar', length: '128' })
  productImage: string;

  @Column({ name: 'price', type: 'int', width: 20 })
  productPrice: string;

  @Column({ name: 'special_price', type: 'int', width: 20 })
  productSpecialPrice: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
