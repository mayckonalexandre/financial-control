import { Module } from '@nestjs/common';
import { PaymentMethodRepository } from 'src/repositories/payment.method.repository';
import { PaymentMethodService } from './payment.method.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from 'src/domain/entities/payment_method';
import { PaymentMethodController } from './payment.method.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, PaymentMethodRepository],
})
export class PaymentMethodModule {}
