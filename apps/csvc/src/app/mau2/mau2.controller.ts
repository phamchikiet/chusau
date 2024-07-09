import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {Mau2Service } from './mau2.service';
@Controller('mau2')
export class Mau2Controller {
  constructor(private readonly mau2Service:Mau2Service) {}

  @Post()
  create(@Body() data: any) {
    return this.mau2Service.create(data);
  }
  @Get()
  async findAll() {
    return await this.mau2Service.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.mau2Service.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.mau2Service.findslug(slug);
  }
  @Get('findidbaocao/:id')
  async findidbaocao(@Param('id') id: string) {
    return await this.mau2Service.findidbaocao(id);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.mau2Service.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.mau2Service.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mau2Service.remove(id);
  }
}
