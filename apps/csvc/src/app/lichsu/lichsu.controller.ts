

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {LichsuService } from './lichsu.service';
@Controller('test_lichsu')
export class LichsuController {
  constructor(private readonly lichsuService:LichsuService) {}

  @Post()
  create(@Body() data: any) {
    return this.lichsuService.create(data);
  }
  @Get()
  async findAll() {
    return await this.lichsuService.findAll();
  }
  @Post('getByidUser')
  async findOne(@Body() data: any) {
    return await this.lichsuService.getByidUser(data);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.lichsuService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.lichsuService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.lichsuService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lichsuService.remove(id);
  }
}