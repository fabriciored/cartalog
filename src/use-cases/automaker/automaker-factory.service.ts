import { Injectable } from '@nestjs/common';
import { Automaker } from '../../core/entities/automaker.entity';
import {
  CreateAutomakerDto,
  UpdateAutomakerDto,
} from '../../core/dtos/automaker.dto';
import { BucketS3 } from 'src/infrastructure/object-storage/s3.config';
const S3 = new BucketS3();
@Injectable()
export class AutomakerFactoryService {
  createNewAutomaker(
    createAutomakerDto: CreateAutomakerDto,
    file: Express.Multer.File,
  ) {
    const newAutomaker = new Automaker();
    S3.save(
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
    newAutomaker.name = updateAutomakerDto.name;
    S3.save(
      file.originalname,
      file.buffer,
      file.mimetype,
      process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME,
    );
    newAutomaker.name = updateAutomakerDto.name;
    newAutomaker.logo = `${process.env.OBJECT_STORAGE_ENDPOINT}/${process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME}/${file.originalname}`;

    return newAutomaker;
  }
}
