import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;
}
