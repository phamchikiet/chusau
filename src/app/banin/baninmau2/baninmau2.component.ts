import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Mau2Service } from '../../baocao/mau2/mau2.service';
import { BaocaoService } from '../../baocao/baocao.service';

@Component({
  selector: 'app-baninmau2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './baninmau2.component.html',
  styleUrls: ['./baninmau2.component.css']
})
export class Baninmau2Component implements OnInit {
  @Input() idBaocao:any;
  DataMau:any[]=[]
  constructor() { }
  _Mau2Service:Mau2Service = inject(Mau2Service)
  Baocao:any
  _BaocaoService:BaocaoService = inject(BaocaoService)
  async ngOnInit() {
     this.DataMau = await this._Mau2Service.getMau2ByidBaocao(this.idBaocao)
     this.Baocao = await this._BaocaoService.getBaocaoByid(this.idBaocao)
     setTimeout(() => {
      window.print();
    }, 1000);
  }

}
