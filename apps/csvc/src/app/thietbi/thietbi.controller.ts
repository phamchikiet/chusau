import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThietbiService } from './thietbi.service';
import { CreateThietbiDto } from './dto/create-thietbi.dto';
import { UpdateThietbiDto } from './dto/update-thietbi.dto';

@Controller('test_thietbi')
export class ThietbiController {
  constructor(private readonly thietbiService: ThietbiService) {}

  @Post()
  create(@Body() createThietbiDto: CreateThietbiDto) {
    return this.thietbiService.create(createThietbiDto);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.thietbiService.findQuery(SearchParams);
  }
  @Get()
  findAll() {
    return this.thietbiService.findAll();
  }
  @Post('loaddata')
  loadata(@Body() listData: any) {
    console.log(listData);
    listData.forEach((v:any)=> {
      this.thietbiService.update(v.id,v)
    })
    return listData
  }

  @Get('findByid/:id')
  findOne(@Param('id') id: string) {
    return this.thietbiService.findByid(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThietbiDto: UpdateThietbiDto) {
    return this.thietbiService.update(id, updateThietbiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thietbiService.remove(id);
  }
}
