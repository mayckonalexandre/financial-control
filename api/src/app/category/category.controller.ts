import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRevenueDto } from './dtos/create.category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async get() {
    return await this.categoryService.getAll();
  }

  @Post()
  async create(@Body() body: CreateRevenueDto) {
    return await this.categoryService.create(body.name);
  }
}