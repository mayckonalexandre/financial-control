import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id_wallet: string;

  @Column({ type: 'varchar', length: 60 })
  user_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.wallets)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
