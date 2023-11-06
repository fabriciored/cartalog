import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
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
    return await this.automakerUseCases.getAllAutomakers();
  }

  @Get(':id')
  async getAutomakerById(@Param('id') id: any) {
    return await this.automakerUseCases.getAutomakerById(id);
  }

  @Post('/create')
  async createAutomaker(@Body() createAutomakerDto: CreateAutomakerDto) {
    return await this.automakerUseCases.createAutomaker(createAutomakerDto);
  }

  @Put('/update/:id')
  async updateAutomaker(
    @Param('id') id: string,
    @Body() updateAutomakerDto: UpdateAutomakerDto,
  ) {
    return await this.automakerUseCases.updateAutomaker(id, updateAutomakerDto);
  }

  @Delete('/delete/:id')
  async deleteAutomaker(@Param('id') id: string) {
    return await this.automakerUseCases.deleteAutomaker(id);
  }
}
