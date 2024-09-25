import { Injectable } from '@nestjs/common';
import { WalletRepository } from 'src/repositories/wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRespository: WalletRepository) {}

  async getByUserId(user_id: string) {
    return await this.walletRespository.getByUserId(user_id);
  }
}
