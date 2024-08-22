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
import { Category } from './category';
import { Origin } from './origin';

@Entity('revenues')
export class Revenue {
  @PrimaryGeneratedColumn()
  id_revenue: number;

  @Column({ type: 'varchar', length: 60 })
  user_id: string;

  @Column({ type: 'int' })
  category_id: number;

  @Column({ type: 'int' })
  origin_id: number;

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

  @ManyToOne(() => User, (user) => user.revenues)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.revenues)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Origin, (origin) => origin.revenues)
  @JoinColumn({ name: 'origin_id' })
  origin: Origin;
}
