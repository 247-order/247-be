import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name', type: 'varchar', length: '20' })
  @Index('IDX_USER_NAME', { unique: true })
  userName: string;

  @Column({ name: 'password', type: 'varchar', length: '60', nullable: true, select: false })
  password: string;

  @Column({ name: 'first_name', type: 'varchar', length: '20', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: '20', nullable: true })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: '60' })
  @Index('IDX_USER_EMAIL', { unique: true })
  email: string;

  @Column({ name: 'dob', type: 'datetime', nullable: true })
  dob: Date;

  @Column({ name: 'is_active', type: 'boolean', default: false, select: false })
  isActive: boolean;

  @CreateDateColumn({ select: false })
  createdDate: Date;

  @UpdateDateColumn({ select: false })
  updatedDate: Date;

  @DeleteDateColumn({ select: false })
  deletedDate: Date;
}
