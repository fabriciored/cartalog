import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Automaker } from '@prisma/client';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  year: string;

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
