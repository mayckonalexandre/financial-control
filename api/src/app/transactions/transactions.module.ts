import { Module } from '@nestjs/common';
import { TransactionsRepository } from 'src/repositories/transactions';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsRepository],
})
export class TransactionsModule {}
