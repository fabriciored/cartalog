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
import { CreateCarDto, UpdateCarDto } from 'src/core/dtos/car.dto';
import { Exceptions } from 'src/infrastructure/exceptions/exceptions.service';
import { CarUseCases } from 'src/use-cases/car/car.use-case';

@Controller('api/cars')
export class CarController {
  constructor(private carUseCases: CarUseCases) {}

  @Get()
  async getAllCars() {
    return await this.carUseCases.getAllCars();
  }

  @Get(':id')
  async getCarById(@Param('id') id: string) {
    const carExists = await this.carUseCases.carExists(id);
    if (carExists == false) {
      return Exceptions.NotFoundException({
        message: 'Car not found.',
      });
    } else if (carExists == true) {
      return await this.carUseCases.getCarById(id);
    }
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/create/:automaker')
  async createCar(
    @Body() createCarDto: CreateCarDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('automaker') automaker: string,
  ) {
    const automakerExists = await this.carUseCases.automakerExists(automaker);
    if (automakerExists == false) {
      return Exceptions.NotFoundException({
        message: 'Automaker not found.',
      });
    }

    if (!file) {
      Exceptions.badRequestException({
        message: 'Image file was not found.',
      });
    }
    return await this.carUseCases.createCar(createCarDto, file, automaker);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Put('/update/:id')
  async updateCar(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const carExists = await this.carUseCases.carExists(id);
    if (carExists == false) {
      return Exceptions.NotFoundException({
        message: 'Car not found.',
      });
    } else if (carExists == true) {
      if (!file) {
        Exceptions.badRequestException({
          message: 'Image file was not found.',
        });
      }
      return await this.carUseCases.updateCar(id, updateCarDto, file);
    }
  }

  @Delete('/delete/:id')
  async deleteCar(@Param('id') id: string) {
    const carExists = await this.carUseCases.carExists(id);
    if (carExists == false) {
      return Exceptions.NotFoundException({
        message: 'Car not found.',
      });
    } else if (carExists == true) {
      return await this.carUseCases.deleteCar(id);
    }
  }
}
