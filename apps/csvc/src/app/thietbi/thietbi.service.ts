import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateThietbiDto } from './dto/create-thietbi.dto';
import { UpdateThietbiDto } from './dto/update-thietbi.dto';
import { Thietbi } from "./entities/thietbi.entity";
@Injectable()
export class ThietbiService {
  constructor(
    @InjectRepository(Thietbi)
    private ThietbiRepository: Repository<Thietbi>
  ) {}
  async create(createThietbiDto: CreateThietbiDto) {
    this.ThietbiRepository.create(createThietbiDto);
    const result = await this.ThietbiRepository.save(createThietbiDto);
    return result
  }
  async findAll() {
    return await this.ThietbiRepository.find();
  }
  async findOne(id: string) {
    return await this.ThietbiRepository.findOne({ where: { id: id } });
  }
  async findByidUser(id: string) {
    return await this.ThietbiRepository.findOne({ where: { idUser: id } });
  }
  async update(id: string, data: Partial<UpdateThietbiDto>) {
    await this.ThietbiRepository.update({ id }, data);
    return await this.ThietbiRepository.findOne({ where :{id:id} });
  }
  async remove(id: string) {
    await this.ThietbiRepository.delete({ id });
    return { deleted: true };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.ThietbiRepository.createQueryBuilder('thietbi');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('thietbi.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.MaDonHang) {
      queryBuilder.andWhere('thietbi.MaDonHang = :MaDonHang', { MaDonHang: `${params.MaDonHang}` });
    }
    let [item, totalCount]:any = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
      // const items = await Promise.all(
      //   item.map(async (v: any) => {
      //     v.Giohangs = await this._GiohangService.findid(v.idGiohang);
      //     v.Khachhang = await this._KhachhangService.findid(v.idKH);
      //     return v; 
      //   })
      // );         
    return { item, totalCount };
  }
} 