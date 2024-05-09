import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { LichsuEntity } from './entities/lichsu.entity';
@Injectable()
export class LichsuService {
  constructor(
    @InjectRepository(LichsuEntity)
    private LichsuRepository: Repository<LichsuEntity>
  ) { }
  async create(data: any) {
    const check = await this.findExits(data)
    console.log('check',check);
    
    if(!check) {
      if(data?.idUser&&data?.idTB)
        {
          this.LichsuRepository.create(data);
          return await this.LichsuRepository.save(data);
        }
    }
    else {
      check.Trangthai = 1
      const result = await this.update(check.id, check)
      console.log('result',result);
      return { error: 1001, data: result }
    }
  }

  async findAll() {
    return await this.LichsuRepository.find();
  }
  async findid(id: string) {
    return await this.LichsuRepository.findOne({ where: { id: id } });
  }
  async findExits(data: any) {
    return await this.LichsuRepository.findOne({
      where: {
        idUser: data.idUser,
        idTB: data.idTB,
        Trangthai:0
      },
    });
  }
  async findslug(idUser: any) {
    return await this.LichsuRepository.findOne({
      where: {idUser : idUser },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.LichsuRepository.count();
    const lichsus = await this.LichsuRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: lichsus,
    };
  }
  async findQuery(params: any) {
    const queryBuilder = this.LichsuRepository.createQueryBuilder('lichsu');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('lichsu.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('lichsu.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
  }
  async update(id: string, UpdateLichsuDto: any) {
    await this.LichsuRepository.save(UpdateLichsuDto);
    return await this.LichsuRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.LichsuRepository.delete(id);
    return { deleted: true };
  }
}
