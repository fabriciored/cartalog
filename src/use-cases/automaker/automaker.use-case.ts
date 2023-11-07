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
    const automakers = await this.prismaService.automaker.findMany();
    return automakers;
  }

  getAutomakerById(id: any): Promise<Automaker> {
    const automaker = this.prismaService.automaker.findUnique({
      where: { id },
    });
    return automaker;
  }

  createAutomaker(
    createAutomakerDto: CreateAutomakerDto,
    file: Express.Multer.File,
  ): Promise<Automaker> {
    const Automaker = this.AutomakerFactoryService.createNewAutomaker(
      createAutomakerDto,
      file,
    );
    return this.prismaService.automaker.create({ data: Automaker });
  }

  updateAutomaker(
    AutomakerId: string,
    updateAutomakerDto: UpdateAutomakerDto,
    file: Express.Multer.File,
  ): Promise<Automaker> {
    const Automaker = this.AutomakerFactoryService.updateAutomaker(
      updateAutomakerDto,
      file,
    );
    return this.prismaService.automaker.update({
      where: { id: +AutomakerId },
      data: Automaker,
    });
  }

  deleteAutomaker(AutomakerId: string): Promise<Automaker> {
    const deleteAutomaker = this.prismaService.automaker.delete({
      where: { id: +AutomakerId },
    });
    return deleteAutomaker;
  }
}
