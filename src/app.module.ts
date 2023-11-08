import { Module } from '@nestjs/common';
import { AutomakerUseCasesModule } from './use-cases/automaker/automaker.use-cases.module';
import { AutomakerController } from './controllers/automaker/automaker.controller';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { CarUseCasesModule } from './use-cases/car/car.use-cases.module';
import { CarController } from './controllers/car/car.controller';

@Module({
  imports: [AutomakerUseCasesModule, CarUseCasesModule, ExceptionsModule],
  controllers: [AutomakerController, CarController],
  providers: [],
})
export class AppModule {}
