import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {Mau1Service } from './mau1.service';
@Controller('mau1')
export class Mau1Controller {
  constructor(private readonly mau1Service:Mau1Service) {}

  @Post()
  create(@Body() data: any) {
    return this.mau1Service.create(data);
  }
  @Get()
  async findAll() {
    return await this.mau1Service.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.mau1Service.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.mau1Service.findslug(slug);
  }
  @Get('findidbaocao/:id')
  async findidbaocao(@Param('id') id: string) {
    return await this.mau1Service.findidbaocao(id);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.mau1Service.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.mau1Service.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mau1Service.remove(id);
  }
}
