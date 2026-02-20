import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Payment } from './entities/payment.entity';
import { MercadoPagoService } from './mercadopago.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemsRepository: Repository<OrderItem>,
        @InjectRepository(Payment)
        private paymentsRepository: Repository<Payment>,
        private mercadoPagoService: MercadoPagoService,
    ) { }

    async createOrder(orderData: any, user: any) {
        const { items, total, paymentMethod } = orderData;

        const order = this.ordersRepository.create({
            user: { id: user.id },
            total: Number(total),
            paymentMethod,
            status: 'pending',
        });

        const savedOrder = await this.ordersRepository.save(order);

        const orderItems = items.map((item: any) =>
            this.orderItemsRepository.create({
                order: savedOrder,
                productId: Number(item.id),
                productName: item.name,
                quantity: Number(item.quantity),
                price: Number(item.price),
            }),
        );

        await this.orderItemsRepository.save(orderItems);

        const payment = this.paymentsRepository.create({
            order: savedOrder,
            method: paymentMethod,
            amount: Number(total),
            status: 'pending',
        });

        await this.paymentsRepository.save(payment);

        let paymentUrl: string | null = null;
        if (paymentMethod === 'mercadopago') {
            const url = await this.mercadoPagoService.createPreference(savedOrder, orderItems);
            paymentUrl = url || null;
        }

        return {
            orderId: savedOrder.id,
            paymentMethod: savedOrder.paymentMethod,
            status: savedOrder.status,
            paymentUrl: paymentUrl,
        };
    }

    async findAllByUser(userId: number) {
        return this.ordersRepository.find({
            where: { user: { id: userId } },
            relations: ['items'],
        });
    }
}
