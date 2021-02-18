import { Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @VersionColumn()
  version: number;
}
