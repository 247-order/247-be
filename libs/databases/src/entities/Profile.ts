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
  @Column({ name: 'first_name', type: 'varchar', length: '20', nullable: true })
  firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name', type: 'varchar', length: '20', nullable: true })
  lastName: string;

  @ApiProperty()
  @Column({ name: 'dob', type: 'datetime', nullable: true })
  dob: Date;

  @ApiProperty()
  @Column({ name: 'avatar', type: 'varchar', length: '128' })
  avatar: string;

  @CreateDateColumn({ select: false })
  createdDate: Date;

  @UpdateDateColumn({ select: false })
  updatedDate: Date;

  @DeleteDateColumn({ select: false })
  deletedDate: Date;
}
