import { Injectable } from '@nestjs/common';
import { AddRecipe } from 'src/domain/use.case/revenues/add.recipe';
import { DeleteRecipe } from 'src/domain/use.case/revenues/delete.recipe';
import { NewRevenue, RecipeFilter } from 'src/domain/use.case/revenues/types';
import { RevenueRepository } from 'src/repositories/revenues.repository';

@Injectable()
export class RevenueService {
  constructor(
    private readonly addRecipe: AddRecipe,
    private readonly deleteRecipe: DeleteRecipe,
    private readonly revenueRepostitory: RevenueRepository,
  ) {}

  async get(data: RecipeFilter) {
    return await this.revenueRepostitory.get(data);
  }

  async AddRecipe(data: NewRevenue) {
    return await this.addRecipe.execute(data);
  }

  async DeleteRecipe(id_revenue: number, user_id: string) {
    return await this.deleteRecipe.execute(id_revenue, user_id);
  }
}
