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

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id_category: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => Revenue, (revenue) => revenue.category)
  revenues: Revenue[];

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Expense[];
}
