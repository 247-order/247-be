import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './Profile';
import { Role, Roles } from './Role';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'user_name', type: 'varchar', length: '20' })
  @Index('IDX_USER_NAME', { unique: true })
  userName: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: '60',
    nullable: true,
    select: false,
  })
  password: string;

  @ApiProperty()
  @Column({ name: 'email', type: 'varchar', length: '60' })
  @Index('IDX_USER_EMAIL', { unique: true })
  email: string;

  @Column({ name: 'is_active', type: 'boolean', default: false, select: false })
  isActive: boolean;

  @OneToOne(() => Role, (role) => role.user, {
    onDelete: 'SET NULL',
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  role: Role;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @CreateDateColumn({ select: false })
  createdDate: Date;

  @UpdateDateColumn({ select: false })
  updatedDate: Date;

  @DeleteDateColumn({ select: false })
  deletedDate: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
