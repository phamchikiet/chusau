import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
@Entity('mau3', {orderBy: { CreateAt: 'DESC' } })
export class Mau3Entity {
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
  @Column({ default: '' })
  Slug: string;
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
