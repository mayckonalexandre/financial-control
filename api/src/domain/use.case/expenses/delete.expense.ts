import { Injectable } from '@nestjs/common';
import { Expense } from 'src/domain/entities/expenses';
import { Wallet } from 'src/domain/entities/wallet';
import { LoggerService } from 'src/infrastructure/log/log.service';
import { DataSource } from 'typeorm';

@Injectable()
export class DeleteExpense {
  constructor(
    private readonly dataSource: DataSource,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(id_expense: number, user_id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const expense = await queryRunner.manager.findOne(Expense, {
        where: { id_expense, user_id },
      });

      if (!expense) throw new Error('Recipe not found!');

      const [, wallet] = await Promise.all([
        queryRunner.manager.update(
          Expense,
          { id_expense: expense.id_expense },
          {
            deleted: 1,
          },
        ),
        queryRunner.manager.findOne(Wallet, {
          where: { user_id },
          lock: { mode: 'pessimistic_write' },
        }),
      ]);

      if (!wallet) throw new Error('Wallet not found to update value!');

      await queryRunner.manager.update(
        Wallet,
        { user_id },
        {
          value: wallet.value + expense.value,
        },
      );

      await queryRunner.commitTransaction();

      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.loggerService.logError('Error when removing recipe', error);
      throw new Error('Error when removing recipe');
    } finally {
      await queryRunner.release();
    }
  }
}
