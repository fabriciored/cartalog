import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { Car } from '../../core/entities/car.entity';
import { CreateCarDto, UpdateCarDto } from '../../core/dtos/car.dto';
import { CarFactoryService } from './car-factory.service';

@Injectable()
export class CarUseCases {
  constructor(
    private prismaService: PrismaService,
    private carFactoryService: CarFactoryService,
  ) {}

  async getAllCars(): Promise<Car[]> {
    const Cars = await this.prismaService.car.findMany({
      include: { automaker: true },
    });
    return Cars;
  }

  async getCarById(id: string): Promise<Car> {
    const Car = await this.prismaService.car.findUnique({
      where: { id },
      include: { automaker: true },
    });
    return Car;
  }

  async createCar(
    createCarDto: CreateCarDto,
    file: Express.Multer.File,
    automaker: string,
  ): Promise<Car> {
    const Automaker = await this.prismaService.automaker.findFirst({
      where: { name: automaker },
    });
    const Car = this.carFactoryService.createNewCar(createCarDto, file);
    return this.prismaService.car.create({
      data: {
        automaker: {
          connect: {
            id: Automaker.id,
          },
        },
        image: Car.image,
        name: Car.name,
        model: Car.model,
        year: +Car.year,
        transmission: Car.transmission,
        fuel: Car.fuel,
        power: Car.power,
        torque: Car.torque,
      },
    });
  }

  async updateCar(
    id: string,
    updateCarDto: UpdateCarDto,
    file: Express.Multer.File,
  ): Promise<Car> {
    const Car = await this.carFactoryService.updateCar(updateCarDto, file);
    return this.prismaService.car.update({
      where: { id },
      data: Car,
    });
  }

  async deleteCar(id: string): Promise<Car> {
    const carImage = await this.prismaService.car.findUnique({
      where: { id },
    });
    const filename = new RegExp(/\/([^\/]+)$/).exec(carImage.image)[1];
    this.carFactoryService.deleteCarImage(filename);
    const deleteCar = this.prismaService.car.delete({
      where: { id },
    });
    return deleteCar;
  }

  carExists(id: string): Promise<boolean> {
    return this.prismaService.car
      .findUnique({
        where: { id },
      })
      .then((Car) => !!Car);
  }

  automakerExists(name: string): Promise<boolean> {
    return this.prismaService.automaker
      .findFirst({
        where: { name },
      })
      .then((automaker) => !!automaker);
  }
}
