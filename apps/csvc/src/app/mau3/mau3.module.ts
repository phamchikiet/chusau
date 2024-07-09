import { Module } from '@nestjs/common';
import { Mau3Service } from './mau3.service';
import { Mau3Controller } from './mau3.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mau3Entity } from './entities/mau3.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Mau3Entity])],
  controllers: [Mau3Controller],
  providers: [Mau3Service]
})
export class Mau3Module {}



