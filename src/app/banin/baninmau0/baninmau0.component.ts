import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Mau0Service } from '../../baocao/mau0/mau0.service';
import { BaocaoService } from '../../baocao/baocao.service';

@Component({
  selector: 'app-baninmau0',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './baninmau0.component.html',
  styleUrls: ['./baninmau0.component.css']
})
export class Baninmau0Component implements OnInit {
  @Input() idBaocao:any;
  DataMau:any
  Baocao:any
  constructor() { }
  _Mau0Service:Mau0Service = inject(Mau0Service)
  _BaocaoService:BaocaoService = inject(BaocaoService)
  async ngOnInit() {
    window.print();
     this.DataMau = await this._Mau0Service.getMau0ByidBaocao(this.idBaocao)
     this.Baocao = await this._BaocaoService.getBaocaoByid(this.idBaocao)
     setTimeout(() => {
      window.print();
    }, 1000);
  }

}
