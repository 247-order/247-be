import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class Address {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Profile, (profile) => profile.address, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  @JoinColumn({ name: 'user_profile_id' })
  profile: Profile;

  @Column({type: 'boolean'})
  default: boolean

  @Column({type: 'varchar', length: '128'})
  description: string

  @CreateDateColumn({ select: false })
  createdDate: Date;

  @CreateDateColumn({ select: false })
  updatedDate: Date;

  @CreateDateColumn({ select: false })
  deletedDate: Date;
}
