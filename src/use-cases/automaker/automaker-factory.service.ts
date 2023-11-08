import { Automaker } from '../../core/entities/automaker.entity';
import {
  CreateAutomakerDto,
  UpdateAutomakerDto,
} from '../../core/dtos/automaker.dto';
import { ObjectStorage } from 'src/infrastructure/object-storage/s3.config';

export class AutomakerFactoryService {
  createNewAutomaker(
    createAutomakerDto: CreateAutomakerDto,
    file: Express.Multer.File,
  ) {
    const newAutomaker = new Automaker();
    ObjectStorage.save(
      file.originalname,
      file.buffer,
      file.mimetype,
      process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME,
    );
    newAutomaker.name = createAutomakerDto.name;
    newAutomaker.logo = `${process.env.OBJECT_STORAGE_ENDPOINT_URL}/${process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME}/${file.originalname}`;
    return newAutomaker;
  }

  updateAutomaker(
    updateAutomakerDto: UpdateAutomakerDto,
    file: Express.Multer.File,
  ) {
    const newAutomaker = new Automaker();
    ObjectStorage.save(
      file.originalname,
      file.buffer,
      file.mimetype,
      process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME,
    );
    newAutomaker.name = updateAutomakerDto.name;
    newAutomaker.logo = `${process.env.OBJECT_STORAGE_ENDPOINT_URL}/${process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME}/${file.originalname}`;

    return newAutomaker;
  }

  deleteAutomakerImage(filename: string) {
    return ObjectStorage.delete(
      filename,
      process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME,
    );
  }
}
