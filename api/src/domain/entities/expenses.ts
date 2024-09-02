import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Category } from './category';
import { Origin } from './origin';
import { PaymentMethod } from './payment_method';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn()
  id_expense: number;

  @Column({ type: 'varchar', length: 60 })
  user_id: string;

  @Column({ type: 'int' })
  category_id: number;

  @Column({ type: 'int' })
  origin_id: number;

  @Column({ type: 'int' })
  payment_method_id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'tinyint', default: 0 })
  deleted: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.expenses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.expenses)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Origin, (origin) => origin.expenses)
  @JoinColumn({ name: 'origin_id' })
  origin: Origin;

  @ManyToOne(() => PaymentMethod, (payment_method) => payment_method.expenses)
  @JoinColumn({ name: 'payment_method_id' })
  payment_method: PaymentMethod;
}
