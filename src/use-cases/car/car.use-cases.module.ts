import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { CarFactoryService } from './car-factory.service';
import { CarUseCases } from './car.use-case';

@Module({
  imports: [],
  providers: [CarFactoryService, CarUseCases, PrismaService],
  exports: [CarFactoryService, CarUseCases],
})
export class CarUseCasesModule {}
