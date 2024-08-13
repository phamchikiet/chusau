import { Module } from '@nestjs/common';
import { Mau0Service } from './mau0.service';
import { Mau0Controller } from './mau0.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mau0Entity } from './entities/mau0.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Mau0Entity])],
  controllers: [Mau0Controller],
  providers: [Mau0Service]
})
export class Mau0Module {}



