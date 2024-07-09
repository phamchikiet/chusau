import { Module } from '@nestjs/common';
import { Mau0Service } from './mau0.service';
import { Mau0Controller } from './mau0.controller';

@Module({
  controllers: [Mau0Controller],
  providers: [Mau0Service]
})
export class Mau0Module {}
