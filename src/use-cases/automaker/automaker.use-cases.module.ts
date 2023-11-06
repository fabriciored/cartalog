import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { AutomakerFactoryService } from './automaker-factory.service';
import { AutomakerUseCases } from './automaker.use-case';

@Module({
  imports: [],
  providers: [AutomakerFactoryService, AutomakerUseCases, PrismaService],
  exports: [AutomakerFactoryService, AutomakerUseCases],
})
export class AutomakerUseCasesModule {}
