import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRevenueDto {
  @ApiProperty()
  @IsOptional()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty()
  @IsNotEmpty()
  origin_id: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

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
