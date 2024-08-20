import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
@Entity('mau0', {orderBy: { CreateAt: 'DESC' } })
export class Mau0Entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idBaocao: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Title: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Mota: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  TenTSCD: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idTSCD: string;
  @Column()
  NamSD: number;
  @Column()
  TheoSoSL: number;
  @Column()
  TheoSoConlai: number;
  @Column()
  KiemkeSL: number;
  @Column()
  KiemkeNguyengia: number;
  @Column()
  KiemkeConlai: number;
  @Column()
  ChenhlechNguyengia: number;
  @Column()
  ChenhlechConlai: number;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  MaCode: number;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Chitiet: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Hangmuc: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Tinhtrang: string;
  @Column()
  Ngaykiemtra: Date;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Ghichu: string;
  @Column({ default: '' })
  Slug: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Cauhinh: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Image: string;
  @Column({ default: '' })
  Type: string;
  @Column({ default: 1 })
  Ordering: number;
  @Column({ default: 0 })
  Status: number;
  @CreateDateColumn()
  CreateAt: Date;
  @UpdateDateColumn()
  UpdateAt: Date;
  @DeleteDateColumn()
  DeleteAt: Date;
  @Column({ nullable: true })
  idCreate: string;
}
