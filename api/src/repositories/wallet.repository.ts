import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from 'src/domain/entities/wallet';
import { Repository } from 'typeorm';

@Injectable()
export class WalletRepository {
  constructor(
    @InjectRepository(Wallet)
    private wallet: Repository<Wallet>,
  ) {}

  async getByUserId(user_id: string) {
    return await this.wallet.findOne({ where: { user_id } });
  }

  async create(user_id: string) {
    return await this.wallet.save({ user_id, value: 0 });
  }
}
