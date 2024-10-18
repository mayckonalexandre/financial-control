import { Injectable } from '@nestjs/common';
import { AddExpense } from 'src/domain/use.case/expenses/add.expense';
import { DeleteExpense } from 'src/domain/use.case/expenses/delete.expense';
import { ExpenseFilter } from 'src/domain/use.case/expenses/types';
import { NewRevenue } from 'src/domain/use.case/revenues/types';
import { ExpenseRepository } from 'src/repositories/expenses.repository';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly addExpense: AddExpense,
    private readonly deleteExpense: DeleteExpense,
    private readonly expenseRepository: ExpenseRepository,
  ) {}

  async get(data: ExpenseFilter) {
    return await this.expenseRepository.get(data);
  }

  async AddRecipe(data: NewRevenue) {
    return await this.addExpense.execute(data);
  }

  async DeleteRecipe(id_revenue: number, user_id: string) {
    return await this.deleteExpense.execute(id_revenue, user_id);
  }
}
