import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Mau3Service } from '../../baocao/mau3/mau3.service';
import { BaocaoService } from '../../baocao/baocao.service';

@Component({
  selector: 'app-baninmau3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './baninmau3.component.html',
  styleUrls: ['./baninmau3.component.css']
})
export class Baninmau3Component implements OnInit {
  @Input() idBaocao:any;
  DataMau:any[]=[]
  constructor() { }
  _Mau3Service:Mau3Service = inject(Mau3Service)
  Baocao:any
  _BaocaoService:BaocaoService = inject(BaocaoService)
  async ngOnInit() {
     this.DataMau = await this._Mau3Service.getMau3ByidBaocao(this.idBaocao)
     this.Baocao = await this._BaocaoService.getBaocaoByid(this.idBaocao)
    setTimeout(() => {
      window.print();
    }, 1000);
  }

}
