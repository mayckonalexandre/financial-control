import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  nome: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @CreateDateColumn()
  criado: Date;

  @UpdateDateColumn()
  alterado: Date;
}
