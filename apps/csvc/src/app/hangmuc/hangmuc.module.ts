import { Module } from '@nestjs/common';
import { HangmucService } from './hangmuc.service';
import { HangmucController } from './hangmuc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HangmucEntity } from './entities/hangmuc.entity';
@Module({
  imports: [TypeOrmModule.forFeature([HangmucEntity])],
  controllers: [HangmucController],
  providers: [HangmucService]
})
export class HangmucModule {}




