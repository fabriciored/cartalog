import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateAutomakerDto,
  UpdateAutomakerDto,
} from 'src/core/dtos/automaker.dto';
import { Exceptions } from 'src/infrastructure/exceptions/exceptions.service';
import { AutomakerUseCases } from 'src/use-cases/automaker/automaker.use-case';

@Controller('api/automakers')
export class AutomakerController {
  constructor(private automakerUseCases: AutomakerUseCases) {}

  @Get()
  async getAllAutomakers() {
    return await this.automakerUseCases.getAllAutomakers();
  }

  @Get(':id')
  async getAutomakerById(@Param('id') id: any) {
    const automakerExists = await this.automakerUseCases.automakerExists(id);
    if (automakerExists == false) {
      return Exceptions.NotFoundException({
        message: 'Automaker not found.',
      });
    } else if (automakerExists == true) {
      return await this.automakerUseCases.getAutomakerById(id);
    }
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/create')
  async createAutomaker(
    @Body() createAutomakerDto: CreateAutomakerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      Exceptions.badRequestException({
        message: 'Image file was not found.',
      });
    }
    return await this.automakerUseCases.createAutomaker(
      createAutomakerDto,
      file,
    );
  }

  @UseInterceptors(FileInterceptor('file'))
  @Put('/update/:id')
  async updateAutomaker(
    @Param('id') id: string,
    @Body() updateAutomakerDto: UpdateAutomakerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const automakerExists = await this.automakerUseCases.automakerExists(id);
    if (automakerExists == false) {
      return Exceptions.NotFoundException({
        message: 'Automaker not found.',
      });
    } else if (automakerExists == true) {
      if (!file) {
        Exceptions.badRequestException({
          message: 'Image file was not found.',
        });
      }
      return await this.automakerUseCases.updateAutomaker(
        id,
        updateAutomakerDto,
        file,
      );
    }
  }

  @Delete('/delete/:id')
  async deleteAutomaker(@Param('id') id: string) {
    const automakerExists = await this.automakerUseCases.automakerExists(id);
    if (automakerExists == false) {
      return Exceptions.NotFoundException({
        message: 'Automaker not found.',
      });
    } else if (automakerExists == true) {
      return await this.automakerUseCases.deleteAutomaker(id);
    }
  }
}
