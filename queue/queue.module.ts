import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QUEUE } from './queue.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([QUEUE]), // Specific to MENU entity
    ],
  controllers: [QueueController],
  providers: [QueueService]
})
export class QueueModule {}
