import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateOrder(id: number, updateData: Partial<CreateOrderDto>): Promise<Order> {
    await this.orderRepository.update(id, updateData);
    return this.getOrderById(id);
  }

  async deleteOrder(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
