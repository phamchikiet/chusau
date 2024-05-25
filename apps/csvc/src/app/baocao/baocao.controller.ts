import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {BaocaoService } from './baocao.service';
@Controller('baocao')
export class BaocaoController {
  constructor(private readonly baocaoService:BaocaoService) {}

  @Post()
  create(@Body() data: any) {
    return this.baocaoService.create(data);
  }
  @Get()
  async findAll() {
    return await this.baocaoService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.baocaoService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.baocaoService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.baocaoService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.baocaoService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baocaoService.remove(id);
  }
}