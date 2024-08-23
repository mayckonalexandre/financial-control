import { Injectable } from '@nestjs/common';
import { Revenue } from 'src/domain/entities/revenues';
import { Wallet } from 'src/domain/entities/wallet';
import { LoggerService } from 'src/infrastructure/log/log.service';
import { DataSource } from 'typeorm';

@Injectable()
export class DeleteRecipe {
  constructor(
    private readonly dataSource: DataSource,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(id_revenue: number, user_id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const revenue = await queryRunner.manager.findOne(Revenue, {
        where: { id_revenue, user_id },
      });

      if (!revenue) throw new Error('Recipe not found!');

      const [, wallet] = await Promise.all([
        queryRunner.manager.update(
          Revenue,
          { id_revenue: revenue.id_revenue },
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
          value: wallet.value - revenue.value,
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
