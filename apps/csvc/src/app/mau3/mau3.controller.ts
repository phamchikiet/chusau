import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {Mau3Service } from './mau3.service';
@Controller('mau3')
export class Mau3Controller {
  constructor(private readonly mau3Service:Mau3Service) {}

  @Post()
  create(@Body() data: any) {
    return this.mau3Service.create(data);
  }
  @Get()
  async findAll() {
    return await this.mau3Service.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.mau3Service.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.mau3Service.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.mau3Service.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.mau3Service.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mau3Service.remove(id);
  }
}