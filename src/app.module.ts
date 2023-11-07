import { Module } from '@nestjs/common';
import { AutomakerUseCasesModule } from './use-cases/automaker/automaker.use-cases.module';
import { AutomakerController } from './controllers/automaker/automaker.controller';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';

@Module({
  imports: [AutomakerUseCasesModule, ExceptionsModule],
  controllers: [AutomakerController],
  providers: [],
})
export class AppModule {}
