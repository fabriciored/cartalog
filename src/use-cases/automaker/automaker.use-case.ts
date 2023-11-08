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
    private automakerFactoryService: AutomakerFactoryService,
  ) {}

  async getAllAutomakers(): Promise<Automaker[]> {
    const automakers = await this.prismaService.automaker.findMany();
    return automakers;
  }

  getAutomakerById(id: string): Promise<Automaker> {
    const automaker = this.prismaService.automaker.findUnique({
      where: { id },
      include: { cars: true },
    });
    return automaker;
  }

  createAutomaker(
    createAutomakerDto: CreateAutomakerDto,
    file: Express.Multer.File,
  ): Promise<Automaker> {
    const Automaker = this.automakerFactoryService.createNewAutomaker(
      createAutomakerDto,
      file,
    );
    return this.prismaService.automaker.create({ data: Automaker });
  }

  async updateAutomaker(
    id: string,
    updateAutomakerDto: UpdateAutomakerDto,
    file: Express.Multer.File,
  ): Promise<Automaker> {
    const Automaker = this.automakerFactoryService.updateAutomaker(
      updateAutomakerDto,
      file,
    );
    const update = this.prismaService.automaker.update({
      where: { id },
      data: Automaker,
    });
    return update;
  }

  async deleteAutomaker(id: string): Promise<Automaker> {
    const automakerLogo = await this.prismaService.automaker.findUnique({
      where: { id },
    });
    const filename = new RegExp(/\/([^\/]+)$/).exec(automakerLogo.logo)[1];
    this.automakerFactoryService.deleteAutomakerImage(filename);
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
