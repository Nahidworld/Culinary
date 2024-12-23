import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QUEUE } from './queue.entity';
import { CreateQueueDto, UpdateQueueStatusDto } from './queue.dto';

@Injectable()
export class QueueService {
  constructor(@InjectRepository(QUEUE)
    private readonly queueRepository: Repository<QUEUE>,) {}

    private queue = [];

    // In-memory Operations
    addQueue(data: any) {
        this.queue.push(data);
        return { message: 'Queue Item Added', data };
    }
    viewAll() {
        return this.queue;
    }
    findByName(name: string) {
        const item = this.queue.find((queue) => queue.name === name);
        return item || { message: 'Queue Item Not Found' };
    }

    //Database
    //Add order to queue
    async addOrderToQueue(createQueueDto: CreateQueueDto) {
        const newQueueItem = this.queueRepository.create(createQueueDto);
        return await this.queueRepository.save(newQueueItem);
    }

    //View all order in queue
    // async getAllQueueItems() {
    //     return await this.queueRepository.find({ order: { createdAt: 'ASC' } });
    // }

    async getAllQueueItems() {
        try {
          const queueItems = await this.queueRepository.find({ order: { createdAt: 'ASC' }, // Order by createdAt in ascending order
          });
          return queueItems.length > 0 ? queueItems: { message: 'No queue items found.' };
        } catch (error) {
            console.error('Error retrieving queue items:', error.message);
            throw new Error('Failed to fetch queue items.');
        }
    }

    //View one order in queue
    async getQueueItemById(id: number) {
        const queueItem = await this.queueRepository.findOne({ where: { id } });
        if (!queueItem) {
            throw new Error(`Queue item with ID ${id} not found.`);
        }
        return queueItem;
    }

    //id use update
    async updateQueueStatus(id: number, updateQueueStatusDto: UpdateQueueStatusDto) {
        const queueItem = await this.getQueueItemById(id);
        Object.assign(queueItem, updateQueueStatusDto);
        return await this.queueRepository.save(queueItem);
    }

    //delete queue using id number
    async deleteQueueItem(id: number) {
        const queueItem = await this.getQueueItemById(id);
        await this.queueRepository.remove(queueItem);
        return { message: `Queue item with ID ${id} deleted successfully.` };
    }
}
