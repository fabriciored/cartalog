import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { Automaker } from '../../core/entities/automaker.entity';
import {
  CreateAutomakerDto,
  UpdateAutomakerDto,
} from '../../core/dtos/automaker.dto';
import { AutomakerFactoryService } from './automaker-factory.service';

@Injectable()
export class AutomakerUseCases {
  constructor(
    private prismaService: PrismaService,
    private AutomakerFactoryService: AutomakerFactoryService,
  ) {}

  async getAllAutomakers(): Promise<Automaker[]> {
    const automaker = await this.prismaService.automaker.findMany();
    return automaker;
  }

  getAutomakerById(id: any): Promise<Automaker> {
    return this.prismaService.automaker.findUnique({ where: { id } });
  }

  createAutomaker(createAutomakerDto: CreateAutomakerDto): Promise<Automaker> {
    const Automaker =
      this.AutomakerFactoryService.createNewAutomaker(createAutomakerDto);
    return this.prismaService.automaker.create({ data: Automaker });
  }

  updateAutomaker(
    AutomakerId: string,
    updateAutomakerDto: UpdateAutomakerDto,
  ): Promise<Automaker> {
    const Automaker =
      this.AutomakerFactoryService.updateAutomaker(updateAutomakerDto);
    return this.prismaService.automaker.update({
      where: { id: +AutomakerId },
      data: Automaker,
    });
  }
}
