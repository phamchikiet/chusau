import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Mau1Entity } from './entities/mau1.entity';
@Injectable()
export class Mau1Service {
  constructor(
    @InjectRepository(Mau1Entity)
    private Mau1Repository: Repository<Mau1Entity>
  ) { }
  async create(data: any) {
      this.Mau1Repository.create(data);
      return await this.Mau1Repository.save(data);
  }

  async findAll() {
    return await this.Mau1Repository.find();
  }
  async findid(id: string) {
    return await this.Mau1Repository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.Mau1Repository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.Mau1Repository.findOne({
      where: { Title: Title },
    });
  }
  async findidbaocao(idbaocao: any) {
    return await this.Mau1Repository.find({
      where: { idBaocao: idbaocao },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.Mau1Repository.count();
    const mau1s = await this.Mau1Repository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: mau1s,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.Mau1Repository.createQueryBuilder('mau1');
    if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('mau1.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('mau1.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateMau1Dto: any) {
    this.Mau1Repository.save(UpdateMau1Dto);
    return await this.Mau1Repository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.Mau1Repository.delete(id);
    return { deleted: true };
  }
}
