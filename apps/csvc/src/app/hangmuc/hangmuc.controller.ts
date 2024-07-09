import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {HangmucService } from './hangmuc.service';
@Controller('hangmuc')
export class HangmucController {
  constructor(private readonly hangmucService:HangmucService) {}

  @Post()
  create(@Body() data: any) {
    return this.hangmucService.create(data);
  }
  @Get()
  async findAll() {
    return await this.hangmucService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.hangmucService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.hangmucService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.hangmucService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.hangmucService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hangmucService.remove(id);
  }
}
