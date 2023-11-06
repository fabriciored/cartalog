import { Module } from '@nestjs/common';
import { AutomakerUseCasesModule } from './use-cases/automaker/automaker.use-cases.module';
import { AutomakerController } from './controllers/automaker/automaker.controller';

@Module({
  imports: [AutomakerUseCasesModule],
  controllers: [AutomakerController],
  providers: [],
})
export class AppModule {}
