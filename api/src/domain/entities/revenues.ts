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

@Entity('revenues')
export class Revenue {
  @PrimaryGeneratedColumn()
  id_revenue: number;

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

  @ManyToOne(() => User, (user) => user.revenues)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
