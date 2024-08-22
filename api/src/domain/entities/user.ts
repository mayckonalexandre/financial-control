import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Revenue } from './revenues';
import { Expense } from './expenses';
import { Wallet } from './wallet';

@Entity('user')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id_user: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'tinyint', default: 0 })
  blocked: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => Revenue, (revenue) => revenue.user)
  revenues: Revenue[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: Wallet[];
}
