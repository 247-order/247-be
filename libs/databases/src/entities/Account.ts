import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

export enum AuthProviderTypes {
  IORDER = 1,
  FACEBOOK = 2,
  GOOGLE = 3,
  APPLE = 4
}

@Entity()
export class Account {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', type: 'varchar', length: '32' })
  @Index('IDX_USER_NAME', { unique: true })
  userName: string;

  @Column({ name: 'password', type: 'varchar', length: '64', select: false })
  password: string;

  @Column({ name: 'first_name', type: 'varchar', length: '64'})
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: '64'})
  lastName: string;

  @Column({ name: 'auth_provider_id', type: 'int', nullable: true})
  authProviderId: number;

  @Column({ name: 'auth_provider_type', type: 'int', nullable: true})
  authProviderType: AuthProviderTypes;

  @Column({ name: 'email', type: 'varchar', length: '64' })
  @Index('IDX_USER_EMAIL', { unique: true })
  email: string;

  @Column({type: 'boolean'})
  emailConfirmed: boolean

  @Column({type: 'int'})
  phone: number

  @Column({type: 'boolean'})
  phoneConfirmed: boolean
}
