import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  automaker: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  transmission: string;

  @IsString()
  @IsNotEmpty()
  fuel: string;

  @IsString()
  @IsNotEmpty()
  power: string;

  @IsString()
  @IsNotEmpty()
  torque: string;
}

export class UpdateCarDto extends PartialType(CreateCarDto) {}
