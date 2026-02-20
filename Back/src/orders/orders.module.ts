import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Payment } from './entities/payment.entity';
import { MercadoPagoService } from './mercadopago.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Payment]),
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, MercadoPagoService],
  exports: [OrdersService],
})
export class OrdersModule { }
