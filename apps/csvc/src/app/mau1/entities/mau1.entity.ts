import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
@Entity('mau1', {orderBy: { CreateAt: 'DESC' } })
export class Mau1Entity {
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
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
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
