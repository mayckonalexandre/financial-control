import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/domain/entities/wallet';
import { CreateWallet } from 'src/domain/use.case/wallet/create.wallet';
import { WalletRepository } from 'src/repositories/wallet.repository';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  controllers: [WalletController],
  providers: [WalletService, CreateWallet, WalletRepository],
  exports: [CreateWallet, WalletRepository],
})
export class WalletModule {}
