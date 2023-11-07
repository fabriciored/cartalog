import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAutomakerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateAutomakerDto extends PartialType(CreateAutomakerDto) {}
