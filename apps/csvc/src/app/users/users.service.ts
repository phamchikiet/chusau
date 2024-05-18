import { ConflictException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async create(data: any) {
    const checkSDT = await this.findbySDT(data);
    const checkEmail = await this.findbyEmail(data);
    if (checkSDT) {
      return [false, 'Số Điện Thoại Đã Tồn Tại'];
    }
    if (checkEmail) {
      return [false, 'Email Đã Tồn Tại'];
    }
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    const validationCode = Math.floor(100000 + Math.random() * 900000);
    data.Code = validationCode;
    this.usersRepository.create(data);
    const newUser = await this.usersRepository.save(data);
    return [true, newUser]; 
  }
  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }
  async read(id: string) {
    return await this.usersRepository.findOne({where: { id: id }});
  }
  async findbyEmail(user: any) {
    return await this.usersRepository.findOne({ where: { email: user.email } });
  }
  async findbySDT(user: any) {
    return await this.usersRepository.findOne({
      where: { SDT: user.SDT },
    });
  }
  async findAdmin() {
    const admin = await this.usersRepository.find(
      {where: { Role: 'admin' }}
      );
    return admin
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.usersRepository.createQueryBuilder('users');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('users.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.MaDonHang) {
      queryBuilder.andWhere('users.MaDonHang = :MaDonHang', { MaDonHang: `${params.MaDonHang}` });
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
      console.log(item, totalCount);
      
    return { item, totalCount };
  }
  async update(id: string, data: Partial<UpdateUserDto>) {
    await this.usersRepository.save(data);
    return await this.read(id);
  }
  async remove(id: string) {
    await this.usersRepository.delete({ id });
    return { deleted: true };
  }

  async changepass(data: any): Promise<any> {
    console.log(data);
    
    const user = await this.read(data.id);
    console.log(user);
    
    if (!user) {
      throw new ConflictException('Tài Khoản Không Đúng');
    }
    const checkPass = await bcrypt.compare(data.oldpass, user.password);
    console.log(checkPass);
    
    if (!checkPass) {
      throw new ConflictException('Mật Khẩu Không Trùng Khớp');
    }
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(data.newpass, salt);
    await this.usersRepository.update(user.id, user);
    return await this.usersRepository.save(user);
  }
}
