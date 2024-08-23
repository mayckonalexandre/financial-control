import { Revenue } from 'src/domain/entities/revenues';

export type NewRevenue = Pick<
  Revenue,
  'category_id' | 'origin_id' | 'description' | 'value' | 'user_id'
>;

export type RecipeFilter = { user_id?: string; id_revenue?: number };
