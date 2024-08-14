import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Mau1Service } from '../../baocao/mau1/mau1.service';

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
  async ngOnInit() {
    window.print();
     this.DataMau = await this._Mau1Service.getMau1ByidBaocao(this.idBaocao)
    console.log(this.DataMau);
  }

}
