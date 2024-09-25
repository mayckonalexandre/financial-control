import { Module } from '@nestjs/common';
import { OriginController } from './origin.controller';
import { OriginService } from './origin.service';
import { OriginRepository } from 'src/repositories/origin.repository';
import { Origin } from 'src/domain/entities/origin';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Origin])],
  controllers: [OriginController],
  providers: [OriginService, OriginRepository],
})
export class OriginModule {}
