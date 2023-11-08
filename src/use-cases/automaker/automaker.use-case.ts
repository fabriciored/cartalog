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

  getAutomakerById(id: string): Promise<Automaker> {
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
    id: string,
    updateAutomakerDto: UpdateAutomakerDto,
    file: Express.Multer.File,
  ): Promise<Automaker> {
    const Automaker = this.AutomakerFactoryService.updateAutomaker(
      updateAutomakerDto,
      file,
    );
    return this.prismaService.automaker.update({
      where: { id },
      data: Automaker,
    });
  }

  deleteAutomaker(id: string): Promise<Automaker> {
    const deleteAutomaker = this.prismaService.automaker.delete({
      where: { id },
    });
    return deleteAutomaker;
  }

  automakerExists(id: string): Promise<boolean> {
    return this.prismaService.automaker
      .findUnique({
        where: { id },
      })
      .then((automaker) => !!automaker);
  }
}
