import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRevenueDto {
  @ApiProperty()
  @IsOptional()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  payment_method: string;

  @ApiProperty()
  @IsNotEmpty()
  origin: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  value: number;
}

export class RevenueDto {
  @ApiProperty()
  @IsOptional()
  user_id: string;

  @ApiProperty()
  @IsOptional()
  id_revenue: number;
}
