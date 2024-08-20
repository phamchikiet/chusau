import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Mau1Service } from '../../baocao/mau1/mau1.service';
import { BaocaoService } from '../../baocao/baocao.service';

@Component({
  selector: 'app-baninmau1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './baninmau1.component.html',
  styleUrls: ['./baninmau1.component.css']
})
export class Baninmau1Component implements OnInit {
  @Input() idBaocao:any;
  DataMau:any[]=[]
  constructor() { }
  _Mau1Service:Mau1Service = inject(Mau1Service)
  Baocao:any
  _BaocaoService:BaocaoService = inject(BaocaoService)
  async ngOnInit() {
     this.DataMau = await this._Mau1Service.getMau1ByidBaocao(this.idBaocao)
     this.Baocao = await this._BaocaoService.getBaocaoByid(this.idBaocao)
     setTimeout(() => {
      window.print();
    }, 1000);
  }

}
