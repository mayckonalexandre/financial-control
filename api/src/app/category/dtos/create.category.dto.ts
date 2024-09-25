import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsOptional()
  category: string;
}
