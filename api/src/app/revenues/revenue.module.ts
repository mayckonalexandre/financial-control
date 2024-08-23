import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/infrastructure/log/log.module';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';
import { AddRecipe } from 'src/domain/use.case/revenues/add.recipe';
import { DeleteRecipe } from 'src/domain/use.case/revenues/delete.recipe';
import { RevenueRepository } from 'src/repositories/revenues.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenue } from 'src/domain/entities/revenues';

@Module({
  imports: [TypeOrmModule.forFeature([Revenue]), LoggerModule],
  controllers: [RevenueController],
  providers: [RevenueService, AddRecipe, DeleteRecipe, RevenueRepository],
  exports: [RevenueRepository],
})
export class RevenueModule {}
