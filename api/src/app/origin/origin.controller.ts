import { Controller, Get } from '@nestjs/common';
import { OriginService } from './origin.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('origin')
@Controller('origin')
export class OriginController {
  constructor(private readonly originService: OriginService) {}

  @Get()
  async getAll() {
    return await this.originService.getAll();
  }
}
