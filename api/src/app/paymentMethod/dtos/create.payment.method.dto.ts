import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty()
  @IsOptional()
  payment_method: string;
}
