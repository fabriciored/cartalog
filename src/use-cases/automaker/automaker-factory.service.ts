import { Injectable } from '@nestjs/common';
import { Automaker } from '../../core/entities/automaker.entity';
import {
  CreateAutomakerDto,
  UpdateAutomakerDto,
} from '../../core/dtos/automaker.dto';

@Injectable()
export class AutomakerFactoryService {
  createNewAutomaker(createAutomakerDto: CreateAutomakerDto) {
    const newAutomaker = new Automaker();
    newAutomaker.name = createAutomakerDto.name;
    newAutomaker.logo = createAutomakerDto.logo;

    return newAutomaker;
  }

  updateAutomaker(updateAutomakerDto: UpdateAutomakerDto) {
    const newAutomaker = new Automaker();
    newAutomaker.name = updateAutomakerDto.name;
    newAutomaker.logo = updateAutomakerDto.logo;

    return newAutomaker;
  }
}
