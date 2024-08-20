import { Injectable } from '@nestjs/common';
import { CreateUser } from 'src/domain/use.case/user/create.user';
import { NewUser } from 'src/domain/use.case/user/types';

@Injectable()
export class UserService {
  constructor(private readonly createUser: CreateUser) {}
  async create(data: NewUser) {
    await this.createUser.execute(data);
  }
}
