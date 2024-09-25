import { Injectable } from '@nestjs/common';
import { OriginRepository } from 'src/repositories/origin.repository';

@Injectable()
export class OriginService {
  constructor(private readonly originRepository: OriginRepository) {}

  async getAll() {
    return await this.originRepository.getAll();
  }
}
