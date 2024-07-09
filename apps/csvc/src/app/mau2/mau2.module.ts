import { Module } from '@nestjs/common';
import { Mau2Service } from './mau2.service';
import { Mau2Controller } from './mau2.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mau2Entity } from './entities/mau2.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Mau2Entity])],
  controllers: [Mau2Controller],
  providers: [Mau2Service]
})
export class Mau2Module {}



