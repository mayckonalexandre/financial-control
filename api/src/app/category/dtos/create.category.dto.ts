import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateRevenueDto {
  @ApiProperty()
  @IsOptional()
  name: string;
}
