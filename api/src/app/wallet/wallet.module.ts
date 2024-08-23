import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/domain/entities/wallet';
import { CreateWallet } from 'src/domain/use.case/wallet/create.wallet';
import { WalletRepository } from 'src/repositories/wallet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [CreateWallet, WalletRepository],
  exports: [CreateWallet, WalletRepository],
})
export class WalletModule {}
