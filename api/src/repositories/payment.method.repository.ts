import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from 'src/domain/entities/payment_method';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodRepository {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethod: Repository<PaymentMethod>,
  ) {}

  async getAll() {
    return await this.paymentMethod.find();
  }

  async create(name: string) {
    return await this.paymentMethod.save({ name });
  }
}
