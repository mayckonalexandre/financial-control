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

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn()
  id_expense: number;

  @Column({ type: 'varchar', length: 60 })
  user_id: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'text' })
  origin: string;

  @Column({ type: 'text' })
  payment_method: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  date: Date;

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
}
