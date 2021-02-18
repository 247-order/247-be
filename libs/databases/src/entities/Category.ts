import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attribute } from './Attribute';
import { Product } from './Product';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.childCategories)
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  childCategories: Category[];

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable()
  products: Product[];

  @ManyToMany(() => Attribute)
  @JoinTable()
  attributes: Attribute[];
}
