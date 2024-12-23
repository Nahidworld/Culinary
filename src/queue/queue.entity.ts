import { Menu } from 'src/menu/menu.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';

export enum QueueStatus {
  Pending = 'pending',
  InProgress = 'in-progress',
  Completed = 'completed',
}

@Entity('queue')
export class QUEUE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  customerName: string;

  @Column({
    type: 'enum',
    enum: QueueStatus,
    default: QueueStatus.Pending,
  })
  status: QueueStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  
}




// import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

// @Entity('queue')
// export class QUEUE {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   orderId: number;

//   @Column()
//   customerName: string;

//   @Column()
//   status: string; //pending/in-progress/completed

//   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
//   updatedAt: Date;
// }
  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // createdAt: Date;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // updatedAt: Date;
//}
