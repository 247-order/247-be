import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './Address';
import { ProductOrdering } from './ProductOrdering';
import { User } from './User';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductOrdering, productOrdering => productOrdering.order)
  productOrdering: ProductOrdering[]

  @ManyToOne(() => Address, address => address.orders)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar' })
  note: string
}
