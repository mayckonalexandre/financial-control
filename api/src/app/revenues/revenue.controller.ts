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
import { RevenueService } from './revenue.service';
import { CreateRevenueDto, RevenueDto } from './dtos/revenue.dto';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';

@ApiTags('revenue')
@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Get()
  @ApiQuery({ type: RevenueDto })
  async get(@Request() request: FastifyRequest, @Query() query: RevenueDto) {
    return await this.revenueService.get({
      ...query,
      user_id: request.user.sub,
    });
  }

  @Post()
  @ApiBody({ type: CreateRevenueDto })
  async add(
    @Request() request: FastifyRequest,
    @Body() body: CreateRevenueDto,
  ) {
    return await this.revenueService.AddRecipe({
      ...body,
      user_id: request.user.sub,
    });
  }

  @Delete(':id_revenue')
  @ApiParam({
    name: 'id_revenue',
    description: 'The unique identifier of the revenue to be deleted',
    required: true,
    type: Number,
  })
  async delete(
    @Request() request: FastifyRequest,
    @Param('id_revenue') id_revenue: string,
  ) {
    return await this.revenueService.DeleteRecipe(
      Number(id_revenue),
      request.user.sub,
    );
  }
}
