import { Controller, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { WalletService } from './wallet.service';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @Get()
  async getByUserId(@Request() request: FastifyRequest) {
    return await this.walletService.getByUserId(request.user.sub);
  }
}
