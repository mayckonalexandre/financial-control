import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getAllTransactions(user_id: string) {
    const sql = `SELECT 
  rev.id_revenue AS id,
  description,
  rev.value AS value,
  category,
  origin,
  payment_method,
  date,
  'revenue' AS type
FROM 
  user usr
INNER JOIN revenues rev ON rev.user_id = usr.id_user
WHERE usr.id_user = ?
  AND rev.deleted = 0

UNION ALL

SELECT 
  exp.id_expense AS id,
  description,
  exp.value AS value,
  category,
  origin,
  payment_method,
  date,
  'expense' AS type
FROM 
  user usr
INNER JOIN expenses exp ON exp.user_id = usr.id_user
WHERE usr.id_user = ?
  AND exp.deleted = 0;
`;

    const transactions = await this.dataSource.query(sql, [user_id, user_id]);

    return transactions;
  }
}
