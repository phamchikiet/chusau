import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BaocaoEntity } from './entities/baocao.entity';
@Injectable()
export class BaocaoService {
  constructor(
    @InjectRepository(BaocaoEntity)
    private BaocaoRepository: Repository<BaocaoEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.BaocaoRepository.create(data);
      return await this.BaocaoRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.BaocaoRepository.find();
  }
  async findid(id: string) {
    return await this.BaocaoRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.BaocaoRepository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.BaocaoRepository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.BaocaoRepository.count();
    const baocaos = await this.BaocaoRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: baocaos,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.BaocaoRepository.createQueryBuilder('baocao');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('baocao.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('baocao.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateBaocaoDto: any) {
    this.BaocaoRepository.save(UpdateBaocaoDto);
    return await this.BaocaoRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.BaocaoRepository.delete(id);
    return { deleted: true };
  }
}
