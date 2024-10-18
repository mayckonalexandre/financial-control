import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { ExpenseService } from './expenses.service';
import { CreateExpenseDto, ExpenseDto } from './dtos/expense.dto';

@ApiTags('expense')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  @ApiQuery({ type: ExpenseDto })
  async get(@Request() request: FastifyRequest, @Query() query: ExpenseDto) {
    return await this.expenseService.get({
      ...query,
      user_id: request.user.sub,
    });
  }

  @Post()
  @ApiBody({ type: CreateExpenseDto })
  async add(
    @Request() request: FastifyRequest,
    @Body() body: CreateExpenseDto,
  ) {
    return await this.expenseService.AddRecipe({
      ...body,
      user_id: request.user.sub,
    });
  }

  @Delete(':id_expense')
  @ApiParam({
    name: 'id_expense',
    description: 'The unique identifier of the expense to be deleted',
    required: true,
    type: Number,
  })
  async delete(
    @Request() request: FastifyRequest,
    @Param('id_expense') id_expense: string,
  ) {
    return await this.expenseService.DeleteRecipe(
      Number(id_expense),
      request.user.sub,
    );
  }
}
