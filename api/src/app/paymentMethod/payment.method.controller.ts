import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentMethodService } from './payment.method.service';
import { CreatePaymentMethodDto } from './dtos/create.payment.method.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('paymentmethod')
@Controller('paymentmethod')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Get()
  async getAll() {
    return await this.paymentMethodService.getAll();
  }

  @Post()
  @ApiBody({ type: CreatePaymentMethodDto })
  async create(@Body() body: CreatePaymentMethodDto) {
    return await this.paymentMethodService.create(body.payment_method);
  }
}
