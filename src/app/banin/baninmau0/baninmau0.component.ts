import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Mau0Service } from '../../baocao/mau0/mau0.service';

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
  constructor() { }
  _Mau0Service:Mau0Service = inject(Mau0Service)
  async ngOnInit() {
    //window.print();
     this.DataMau = await this._Mau0Service.getMau0ByidBaocao(this.idBaocao)
    console.log(this.DataMau);
  }

}
