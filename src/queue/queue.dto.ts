import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum QueueStatus {
  Pending = 'pending',
  InProgress = 'in-progress',
  Completed = 'completed',
}

export class CreateQueueDto {
  @IsNumber({}, { message: 'Order ID must be a number' })
  @IsNotEmpty({ message: 'Order ID is required' })
  orderId: number;

  @IsString({ message: 'Customer name must be a string' })
  @IsNotEmpty({ message: 'Customer name is required' })
  customerName: string;

  @IsEnum(QueueStatus, { message: 'Status must be pending, in-progress, or completed' })
  @IsNotEmpty({ message: 'Status is required' })
  status: QueueStatus;
}

export class UpdateQueueStatusDto {
  @IsEnum(QueueStatus, { message: 'Status must be pending, in-progress, or completed' })
  @IsNotEmpty({ message: 'Status is required' })
  status: QueueStatus;
}



// import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// export class CreateQueueDto {
//   @IsNumber()
//   @IsNotEmpty()
//   orderId: number;

//   @IsString()
//   @IsNotEmpty()
//   customerName: string;

//   @IsString()
//   @IsNotEmpty()
//   status: string; //pending/in-progress/completed
// }

// export class UpdateQueueStatusDto {
//   @IsString()
//   @IsNotEmpty()
//   status: string; // New status
// }
