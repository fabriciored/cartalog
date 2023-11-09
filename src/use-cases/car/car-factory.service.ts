import { Car } from '../../core/entities/car.entity';
import { CreateCarDto, UpdateCarDto } from '../../core/dtos/car.dto';
import { ObjectStorage } from 'src/infrastructure/object-storage/s3.config';

export class CarFactoryService {
  createNewCar(createCarDto: CreateCarDto, file: Express.Multer.File) {
    const newCar = new Car();
    ObjectStorage.save(
      file.originalname,
      file.buffer,
      file.mimetype,
      process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME,
    );
    newCar.image = `${process.env.OBJECT_STORAGE_ENDPOINT_URL}/${process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME}/${file.originalname}`;
    newCar.name = createCarDto.name;
    newCar.model = createCarDto.model;
    newCar.year = createCarDto.year;
    newCar.transmission = createCarDto.transmission;
    newCar.fuel = createCarDto.fuel;
    newCar.power = createCarDto.power;
    newCar.torque = createCarDto.torque;
    return newCar;
  }

  updateCar(updateCarDto: UpdateCarDto, file: Express.Multer.File) {
    const newCar = new Car();
    ObjectStorage.save(
      file.originalname,
      file.buffer,
      file.mimetype,
      process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME,
    );
    newCar.image = `${process.env.OBJECT_STORAGE_ENDPOINT_URL}/${process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME}/${file.originalname}`;
    newCar.name = updateCarDto.name;
    newCar.model = updateCarDto.model;
    newCar.year = updateCarDto.year;
    newCar.transmission = updateCarDto.transmission;
    newCar.fuel = updateCarDto.fuel;
    newCar.power = updateCarDto.power;
    newCar.torque = updateCarDto.torque;
    return newCar;
  }

  deleteCarImage(filename: string) {
    return ObjectStorage.delete(
      filename,
      process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME,
    );
  }
}
