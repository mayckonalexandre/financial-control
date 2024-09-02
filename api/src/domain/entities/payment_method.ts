import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Revenue } from './revenues';
import { Expense } from './expenses';

@Entity('payment_method')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id_payment_method: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => Revenue, (revenue) => revenue.payment_method)
  revenues: Revenue[];

  @OneToMany(() => Expense, (expense) => expense.payment_method)
  expenses: Expense[];
}
