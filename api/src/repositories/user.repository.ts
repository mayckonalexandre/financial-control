import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user';
import { NewUser } from 'src/domain/use.case/user/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  async getById(id_user: string) {
    return await this.user.findOne({ where: { id_user, blocked: 0 } });
  }

  async getByEmail(email: string) {
    return await this.user.findOne({ where: { email, blocked: 0 } });
  }

  async create(data: NewUser) {
    return await this.user.save(data);
  }

  async delete(id_user: string) {
    return await this.user.update(id_user, { blocked: 1 });
  }
}
