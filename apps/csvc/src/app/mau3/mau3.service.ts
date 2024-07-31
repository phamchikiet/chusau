import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Mau3Entity } from './entities/mau3.entity';
@Injectable()
export class Mau3Service {
  constructor(
    @InjectRepository(Mau3Entity)
    private Mau3Repository: Repository<Mau3Entity>
  ) { }
  async create(data: any) {
    this.Mau3Repository.create(data);
    return await this.Mau3Repository.save(data);
  }

  async findAll() {
    return await this.Mau3Repository.find();
  }
  async findid(id: string) {
    return await this.Mau3Repository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.Mau3Repository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.Mau3Repository.findOne({
      where: { Title: Title },
    });
  }
  async findidbaocao(idbaocao: any) {
    return await this.Mau3Repository.find({
      where: { idBaocao: idbaocao },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.Mau3Repository.count();
    const mau3s = await this.Mau3Repository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: mau3s,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.Mau3Repository.createQueryBuilder('mau3');
    if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('mau3.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('mau3.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateMau3Dto: any) {
    this.Mau3Repository.save(UpdateMau3Dto);
    return await this.Mau3Repository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.Mau3Repository.delete(id);
    return { deleted: true };
  }
}
