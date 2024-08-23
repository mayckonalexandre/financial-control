import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/domain/entities/category';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private category: Repository<Category>,
  ) {}

  async getAll() {
    return await this.category.find();
  }

  async getById(id_category: number) {
    return await this.category.findOne({ where: { id_category } });
  }

  async create(name: string) {
    return await this.category.save({ name });
  }
}
