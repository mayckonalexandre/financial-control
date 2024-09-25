import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Revenue } from 'src/domain/entities/revenues';
import { RecipeFilter } from 'src/domain/use.case/revenues/types';
import { Repository } from 'typeorm';

@Injectable()
export class RevenueRepository {
  constructor(
    @InjectRepository(Revenue)
    private revenue: Repository<Revenue>,
  ) {}

  async get(filters: RecipeFilter) {
    const whereOptions: {
      [key: string]: {
        instruction: string;
        filter: { [key: string]: string | number };
      };
    } = {
      user_id: {
        instruction: 'rev.user_id = :userId',
        filter: { userId: filters.user_id },
      },
      id_revenue: {
        instruction: 'rev.id_revenue = :idRevenue',
        filter: { idRevenue: filters.id_revenue },
      },
    };

    const query = this.revenue
      .createQueryBuilder('rev')
      .innerJoin('rev.category', 'ctg')
      .innerJoin('rev.origin', 'org')
      .innerJoin('rev.payment_method', 'pm')
      .select([
        'rev.id_revenue AS id_revenue',
        'rev.description AS description',
        'rev.value AS value',
        'ctg.category AS category',
        'org.origin AS origin',
        'pm.payment_method AS payment_method',
      ])
      .where('rev.deleted = :deleted', { deleted: 0 });

    Object.keys(filters).forEach((option) => {
      const filter = whereOptions[option];
      if (filter) query.andWhere(filter.instruction, filter.filter);
    });

    return await query.getRawMany();
  }
}
