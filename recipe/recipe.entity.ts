import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RECIPE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  ingredients: string;

  @Column()
  instructions: string;

  
}
