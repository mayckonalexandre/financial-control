import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from 'src/domain/entities/expenses';
import { LoggerModule } from 'src/infrastructure/log/log.module';
import { ExpenseService } from './expenses.service';
import { AddExpense } from 'src/domain/use.case/expenses/add.expense';
import { DeleteExpense } from 'src/domain/use.case/expenses/delete.expense';
import { ExpenseRepository } from 'src/repositories/expenses.repository';
import { Module } from '@nestjs/common';
import { ExpenseController } from './expenses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), LoggerModule],
  controllers: [ExpenseController],
  providers: [ExpenseService, AddExpense, DeleteExpense, ExpenseRepository],
  exports: [ExpenseRepository],
})
export class ExpenseModule {}
