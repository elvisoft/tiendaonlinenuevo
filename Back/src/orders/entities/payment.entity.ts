import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order;

    @Column()
    method: string;

    @Column({ nullable: true })
    transactionId: string;

    @Column()
    amount: number;

    @Column({ default: 'pending' })
    status: string;

    @CreateDateColumn()
    createdAt: Date;
}
