import { Revenue } from 'src/domain/entities/revenues';

export type NewRevenue = Pick<
  Revenue,
  | 'category'
  | 'origin'
  | 'description'
  | 'date'
  | 'value'
  | 'user_id'
  | 'payment_method'
>;

export type RecipeFilter = { user_id?: string; id_revenue?: number };
