import { Injectable } from '@nestjs/common';
import { PaymentMethodRepository } from 'src/repositories/payment.method.repository';

@Injectable()
export class PaymentMethodService {
  constructor(
    private readonly paymentMethodRepository: PaymentMethodRepository,
  ) {}

  async getAll() {
    return await this.paymentMethodRepository.getAll();
  }

  async create(payment_method: string) {
    return await this.paymentMethodRepository.create(payment_method);
  }
}
