import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  customerName: string;

  @Column({ nullable: true })
  recipeId: number;
  @Column({ nullable: true })
  dish: string;
  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  quantity: number;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;
}

// @Entity()
// export class Order {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   customerName: string;

//   @Column()
//   recipeId: number;

//   @Column()
//   quantity: number;

//   @CreateDateColumn()
//   createdAt: Date;
// }
