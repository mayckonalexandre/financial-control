import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Origin } from 'src/domain/entities/origin';
import { Repository } from 'typeorm';

@Injectable()
export class OriginRepository {
  constructor(
    @InjectRepository(Origin)
    private origin: Repository<Origin>,
  ) {}

  async getAll() {
    return await this.origin.find();
  }

  async getById(id_origin: number) {
    return await this.origin.findOne({ where: { id_origin } });
  }

  async create(name: string) {
    return await this.origin.save({ name });
  }
}
