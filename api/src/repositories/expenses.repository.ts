import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/domain/entities/expenses';
import { ExpenseFilter } from 'src/domain/use.case/expenses/types';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseRepository {
  constructor(
    @InjectRepository(Expense)
    private expense: Repository<Expense>,
  ) {}

  async get(filters: ExpenseFilter) {
    const whereOptions: {
      [key: string]: {
        instruction: string;
        filter: { [key: string]: string | number };
      };
    } = {
      user_id: {
        instruction: 'exp.user_id = :userId',
        filter: { userId: filters.user_id },
      },
      id_revenue: {
        instruction: 'exp.id_revenue = :idExpense',
        filter: { idExpense: filters.id_revenue },
      },
    };

    const query = this.expense
      .createQueryBuilder('exp')
      .innerJoin('exp.category', 'ctg')
      .innerJoin('exp.origin', 'org')
      .innerJoin('exp.payment_method', 'pm')
      .select([
        'exp.id_revenue AS id_revenue',
        'exp.description AS description',
        'exp.value AS value',
        'ctg.category AS category',
        'org.origin AS origin',
        'pm.payment_method AS payment_method',
      ])
      .where('exp.deleted = :deleted', { deleted: 0 });

    Object.keys(filters).forEach((option) => {
      const filter = whereOptions[option];
      if (filter) query.andWhere(filter.instruction, filter.filter);
    });

    return await query.getRawMany();
  }
}
