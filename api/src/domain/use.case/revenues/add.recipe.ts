import { Injectable } from '@nestjs/common';
import { NewRevenue } from './types';
import { Revenue } from 'src/domain/entities/revenues';
import { DataSource } from 'typeorm';
import { LoggerService } from 'src/infrastructure/log/log.service';
import { Wallet } from 'src/domain/entities/wallet';

@Injectable()
export class AddRecipe {
  constructor(
    private readonly dataSource: DataSource,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(data: NewRevenue) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const revenue = await queryRunner.manager.save(Revenue, data);

      const wallet = await queryRunner.manager.findOne(Wallet, {
        where: { user_id: data.user_id },
        lock: { mode: 'pessimistic_write' },
      });

      if (!wallet) throw new Error('Wallet not found to update value!');

      await queryRunner.manager.update(
        Wallet,
        { user_id: data.user_id },
        { value: wallet.value + revenue.value },
      );

      await queryRunner.commitTransaction();

      return revenue;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.loggerService.logError('Error when adding recipe', error);
      throw new Error('Error when adding recipe');
    } finally {
      await queryRunner.release();
    }
  }
}
