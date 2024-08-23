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
    return await this.revenue.findBy(filters);
  }

  async getAll() {
    return await this.revenue.find();
  }

  async getByUserId(user_id: string) {
    return await this.revenue.findBy({ user_id, deleted: 0 });
  }

  async getById(id_revenue: number) {
    return await this.revenue.findOne({ where: { id_revenue, deleted: 0 } });
  }
}
