import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum GalleryTypes {
  Product = 'product',
  Category = 'category',
}

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['product', 'category'] })
  type: GalleryTypes;

  @Column({ type: 'boolean', default: false })
  primary: boolean;

  @Column({ name: 'image_url', type: 'varchar' })
  imageUrl: string;

  @Column({ name: 'thumb_url', type: 'varchar' })
  thumbUrl: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
