import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto, UpdateQueueStatusDto } from './queue.dto';
//import { CreateQueueDTO, UpdateQueueDTO } from './queue.dto';

@Controller('queue')
export class QueueController {
    constructor(private readonly queueService: QueueService) {}

    // In-memory Operations
    @Post('/add')
    addMenu(@Body() data: CreateQueueDto) {
        return this.queueService.addQueue(data);
    }
    @Get('/view')
    viewAll() {
        return this.queueService.viewAll();
    }
    @Get('/:name')
    findByName(@Param('name') name: string) {
        return this.queueService.findByName(name);
    }

    //Database
    //Add order to queue by post method
    @Post('/db/add')
    async addOrderToQueue(@Body() createQueueDto: CreateQueueDto) {
        return await this.queueService.addOrderToQueue(createQueueDto);
    }
    //View all order in queue by get method
    @Get()
    async getAllQueueItems() {
      return await this.queueService.getAllQueueItems();
    }
    //View one order in queue by get method
    @Get('/getAll/:id')
    async getQueueItemById(@Param('id') id: number) {
        return await this.queueService.getQueueItemById(id);
    }
    //updateQueue Status
    @Patch('/update/:id')
        updateById(@Param('id') id, @Body() data: UpdateQueueStatusDto) {
        return this.queueService.updateQueueStatus(id, data);
    }
    //delete queue
    @Delete('/delete/:id')
    async deleteQueueItem(@Param('id') id: number) {
        return await this.queueService.deleteQueueItem(id);
    }
}
