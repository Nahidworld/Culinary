import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Name of the dish

  @Column('text',{ nullable: true })
  description: string; // Description of the dish

  @Column({ nullable: true })
  price: number; // Price of the dish

  @Column({ nullable: true })
  imageUrl: string; // Image URL for the dish

  @Column({ nullable: true })
  isAvailable: boolean; // Availability of the dish (active/inactive)

  
}



// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class MENU {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   description: string;

//   @Column()
//   price: number;

//   @Column()
//   category: string;
  
// }
