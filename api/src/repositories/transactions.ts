import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getAllTransactions(user_id: string) {
    const sql = `SELECT 
  rev.id_revenue AS id,
  rev.description AS description,
  rev.value AS value,
  ctg.category AS category,
  org.origin AS origin,
  pm.payment_method AS payment_method,
  'revenue' AS type
FROM 
  user usr
INNER JOIN revenues rev ON rev.user_id = usr.id_user
INNER JOIN category ctg ON rev.category_id = ctg.id_category
INNER JOIN origin org ON org.id_origin = rev.origin_id
INNER JOIN payment_method pm ON pm.id_payment_method = rev.payment_method_id
WHERE usr.id_user = ?
  AND rev.deleted = 0

UNION ALL

SELECT 
  exp.id_expense AS id,
  exp.description AS description,
  exp.value AS value,
  ctg.category AS category,
  org.origin AS origin,
  pm.payment_method AS payment_method,
  'expense' AS type
FROM 
  user usr
INNER JOIN expenses exp ON exp.user_id = usr.id_user
INNER JOIN category ctg ON exp.category_id = ctg.id_category
INNER JOIN origin org ON org.id_origin = exp.origin_id
INNER JOIN payment_method pm ON pm.id_payment_method = exp.payment_method_id
WHERE usr.id_user = ?
  AND exp.deleted = 0
`;

    const transactions = await this.dataSource.query(sql, [user_id, user_id]);

    return transactions;
  }
}
