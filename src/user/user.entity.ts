// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}



// // import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
// // import * as bcrypt from 'bcrypt';

// // @Entity()
// // export class User {
// //   @PrimaryGeneratedColumn('uuid')
// //   id: string;

// //   @Column({ unique: true })
// //   email: string;

// //   @Column()
// //   password: string;

// //   @Column()
// //   name: string;

// //   @BeforeInsert()
// //   async hashPassword() {
// //     this.password = await bcrypt.hash(this.password, 10);
// //   }

// //   async comparePassword(attempt: string): Promise<boolean> {
// //     return bcrypt.compare(attempt, this.password);
// //   }
// // }


// // // import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// // // @Entity('user')
// // // export class User {
// // //   @PrimaryGeneratedColumn()
// // //   id: number;

// // //   @Column()
// // //   name: string;

// // //   @Column({ unique: true })
// // //   email: string;

// // //   @Column()
// // //   password: string; // Hashed password
// // // }
