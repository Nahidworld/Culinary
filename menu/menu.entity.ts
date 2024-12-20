import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MENU {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;
  
}
