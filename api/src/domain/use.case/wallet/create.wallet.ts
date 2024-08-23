import { Injectable } from '@nestjs/common';
import { WalletRepository } from 'src/repositories/wallet.repository';

@Injectable()
export class CreateWallet {
  constructor(private readonly walletRepository: WalletRepository) {}

  async create(user_id: string) {
    const wallet = await this.walletRepository.getByUserId(user_id);
    if (wallet) throw new Error('User already has a wallet');
    return await this.walletRepository.create(user_id);
  }
}
