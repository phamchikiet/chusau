import { Module } from '@nestjs/common';
import { Mau1Service } from './mau1.service';
import { Mau1Controller } from './mau1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mau1Entity } from './entities/mau1.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Mau1Entity])],
  controllers: [Mau1Controller],
  providers: [Mau1Service]
})
export class Mau1Module {}



