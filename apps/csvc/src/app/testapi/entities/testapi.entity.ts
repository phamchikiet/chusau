import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { environment } from 'apps/csvc/src/environments/environment.prod'
import { LichsuEntity } from '../../lichsu/entities/lichsu.entity';
@Entity('testapi', {
orderBy: { Ngaytao: 'DESC' } })
export class TestapiEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Tieude: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Hinhanh: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
