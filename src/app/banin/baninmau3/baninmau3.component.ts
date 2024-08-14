import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Mau3Service } from '../../baocao/mau3/mau3.service';

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
  async ngOnInit() {
     this.DataMau = await this._Mau3Service.getMau3ByidBaocao(this.idBaocao)
    console.log(this.DataMau);
    setTimeout(() => {
      window.print();
    }, 1000);
  }

}
