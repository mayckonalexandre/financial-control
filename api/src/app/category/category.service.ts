import { HttpException, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAll() {
    return await this.categoryRepository.getAll();
  }

  async create(name: string) {
    const category = await this.categoryRepository.getByName(name);

    if (category) throw new HttpException('Category already registered', 400);

    return await this.categoryRepository.create(name);
  }
}
