import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {Mau0Service } from './mau0.service';
@Controller('mau0')
export class Mau0Controller {
  constructor(private readonly mau0Service:Mau0Service) {}

  @Post()
  create(@Body() data: any) {
    return this.mau0Service.create(data);
  }
  @Get()
  async findAll() {
    return await this.mau0Service.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.mau0Service.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.mau0Service.findslug(slug);
  }
  @Get('findidbaocao/:id')
  async findidbaocao(@Param('id') id: string) {
    return await this.mau0Service.findidbaocao(id);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.mau0Service.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.mau0Service.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mau0Service.remove(id);
  }
}
