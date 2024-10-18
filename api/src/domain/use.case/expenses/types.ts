import { Expense } from 'src/domain/entities/expenses';

export type NewExpense = Pick<
  Expense,
  | 'category'
  | 'origin'
  | 'description'
  | 'date'
  | 'value'
  | 'user_id'
  | 'payment_method'
>;

export type ExpenseFilter = { user_id?: string; id_revenue?: number };
