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
import { AutomakerUseCases } from 'src/use-cases/automaker/automaker.use-case';

@Controller('api/automakers')
export class AutomakerController {
  constructor(private automakerUseCases: AutomakerUseCases) {}

  @Get()
  async getAllAutomakers() {
    console.log('test');
    return await this.automakerUseCases.getAllAutomakers();
  }

  @Get(':id')
  async getAutomakerById(@Param('id') id: any) {
    return await this.automakerUseCases.getAutomakerById(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/create')
  async createAutomaker(
    @Body() createAutomakerDto: CreateAutomakerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
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
    return await this.automakerUseCases.updateAutomaker(
      id,
      updateAutomakerDto,
      file,
    );
  }

  @Delete('/delete/:id')
  async deleteAutomaker(@Param('id') id: string) {
    return await this.automakerUseCases.deleteAutomaker(id);
  }
}
