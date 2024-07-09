import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { HangmucEntity } from './entities/hangmuc.entity';
@Injectable()
export class HangmucService {
  constructor(
    @InjectRepository(HangmucEntity)
    private HangmucRepository: Repository<HangmucEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.HangmucRepository.create(data);
      return await this.HangmucRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.HangmucRepository.find();
  }
  async findid(id: string) {
    return await this.HangmucRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.HangmucRepository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.HangmucRepository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.HangmucRepository.count();
    const hangmucs = await this.HangmucRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: hangmucs,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.HangmucRepository.createQueryBuilder('hangmuc');
    if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('hangmuc.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('hangmuc.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateHangmucDto: any) {
    this.HangmucRepository.save(UpdateHangmucDto);
    return await this.HangmucRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.HangmucRepository.delete(id);
    return { deleted: true };
  }
}

