import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  async getById(id_user: string) {
    return await this.user.findOne({ where: { id_user } });
  }

  async getByEmail(email: string) {
    return await this.user.findOne({ where: { email } });
  }

  async create(data: { name: string; password: string; email: string }) {
    return await this.user.save(data);
  }
}
