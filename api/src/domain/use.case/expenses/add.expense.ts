import { Injectable } from '@nestjs/common';
import { Expense } from 'src/domain/entities/expenses';
import { DataSource } from 'typeorm';
import { LoggerService } from 'src/infrastructure/log/log.service';
import { Wallet } from 'src/domain/entities/wallet';
import { NewExpense } from './types';

@Injectable()
export class AddExpense {
  constructor(
    private readonly dataSource: DataSource,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(data: NewExpense) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const expense = await queryRunner.manager.save(Expense, data);

      const wallet = await queryRunner.manager.findOne(Wallet, {
        where: { user_id: data.user_id },
        lock: { mode: 'pessimistic_write' },
      });

      if (!wallet) throw new Error('Wallet not found to update value!');

      await queryRunner.manager.update(
        Wallet,
        { user_id: data.user_id },
        { value: wallet.value - expense.value },
      );

      await queryRunner.commitTransaction();

      return expense;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.loggerService.logError('Error when adding recipe', error);
      throw new Error('Error when adding recipe');
    } finally {
      await queryRunner.release();
    }
  }
}
