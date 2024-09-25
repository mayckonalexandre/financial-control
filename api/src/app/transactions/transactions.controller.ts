import { Controller, Get, Request } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { TransactionsRepository } from 'src/repositories/transactions';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  @Get()
  async get(@Request() request: FastifyRequest) {
    return await this.transactionsRepository.getAllTransactions(
      request.user.sub,
    );
  }
}
