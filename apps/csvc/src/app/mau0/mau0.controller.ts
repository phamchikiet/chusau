import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Mau0Service } from './mau0.service';
import { CreateMau0Dto } from './dto/create-mau0.dto';
import { UpdateMau0Dto } from './dto/update-mau0.dto';

@Controller('mau0')
export class Mau0Controller {
  constructor(private readonly mau0Service: Mau0Service) {}

  @Post()
  create(@Body() createMau0Dto: CreateMau0Dto) {
    return this.mau0Service.create(createMau0Dto);
  }

  @Get()
  findAll() {
    return this.mau0Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mau0Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMau0Dto: UpdateMau0Dto) {
    return this.mau0Service.update(+id, updateMau0Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mau0Service.remove(+id);
  }
}
