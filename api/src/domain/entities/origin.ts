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

@Entity('origin')
export class Origin {
  @PrimaryGeneratedColumn()
  id_origin: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => Revenue, (revenue) => revenue.origin)
  revenues: Revenue[];

  @OneToMany(() => Expense, (expense) => expense.origin)
  expenses: Expense[];
}
