import { ApiProperty } from "@nestjs/swagger";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

export enum ProductOrderingStatus {
  ORDERING = 'ORDERING'
}

@Entity()
export class ProductOrdering {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => Product, (product) => product.productOrdering, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.productOrdering, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({type: 'varchar'})
  status: ProductOrderingStatus

  @ApiProperty()
  @Column({ name: 'price', type: 'float', width: 20 })
  price: number;
}
