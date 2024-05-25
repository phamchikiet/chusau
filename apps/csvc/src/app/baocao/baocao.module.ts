import { Module } from '@nestjs/common';
import { BaocaoService } from './baocao.service';
import { BaocaoController } from './baocao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaocaoEntity } from './entities/baocao.entity';
@Module({
  imports: [TypeOrmModule.forFeature([BaocaoEntity])],
  controllers: [BaocaoController],
  providers: [BaocaoService]
})
export class BaocaoModule {}



