import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './Address';
import { User } from './User';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @Column({ name: 'full_name', type: 'varchar', length: '64', nullable: true })
  fullName: string;

  @ApiProperty()
  @Column({ name: 'dob', type: 'datetime', nullable: true })
  dob: Date;

  @ApiProperty()
  @Column({ name: 'phone', type: 'varchar', length: '20'})
  phone: string;

  @ApiProperty()
  @Column({ name: 'avatar', type: 'varchar', length: '128', nullable: true })
  avatar: string;

  @OneToOne(() => Address, (address) => address.profile)
  address: Promise<Address>;

  @CreateDateColumn({ select: false })
  createdDate: Date;

  @UpdateDateColumn({ select: false })
  updatedDate: Date;

  @DeleteDateColumn({ select: false })
  deletedDate: Date;
}
