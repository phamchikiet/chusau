import { Injectable } from '@nestjs/common';
import { CreateMau0Dto } from './dto/create-mau0.dto';
import { UpdateMau0Dto } from './dto/update-mau0.dto';

@Injectable()
export class Mau0Service {
  create(createMau0Dto: CreateMau0Dto) {
    return 'This action adds a new mau0';
  }

  findAll() {
    return `This action returns all mau0`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mau0`;
  }

  update(id: number, updateMau0Dto: UpdateMau0Dto) {
    return `This action updates a #${id} mau0`;
  }

  remove(id: number) {
    return `This action removes a #${id} mau0`;
  }
}
