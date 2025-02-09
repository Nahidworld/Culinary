import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  @Patch(':id')
  updateOrder(@Param('id') id: number, @Body() updateData: Partial<CreateOrderDto>) {
    return this.orderService.updateOrder(id, updateData);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }
}
