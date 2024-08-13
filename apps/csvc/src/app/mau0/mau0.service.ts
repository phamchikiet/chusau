import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Mau0Entity } from './entities/mau0.entity';
@Injectable()
export class Mau0Service {
  constructor(
    @InjectRepository(Mau0Entity)
    private Mau0Repository: Repository<Mau0Entity>
  ) { }
  async create(data: any) {
      this.Mau0Repository.create(data);
      return await this.Mau0Repository.save(data);
  }

  async findAll() {
    return await this.Mau0Repository.find();
  }
  async findid(id: string) {
    return await this.Mau0Repository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.Mau0Repository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.Mau0Repository.findOne({
      where: { Title: Title },
    });
  }
  async findidbaocao(idbaocao: any) {
    return await this.Mau0Repository.find({
      where: { idBaocao: idbaocao },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.Mau0Repository.count();
    const mau0s = await this.Mau0Repository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: mau0s,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.Mau0Repository.createQueryBuilder('mau0');
    if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('mau0.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('mau0.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateMau0Dto: any) {
    this.Mau0Repository.save(UpdateMau0Dto);
    return await this.Mau0Repository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.Mau0Repository.delete(id);
    return { deleted: true };
  }
}
