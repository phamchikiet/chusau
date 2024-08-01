import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mau3Service } from '../baocao/mau3/mau3.service';
import { Baninmau3Component } from './baninmau3/baninmau3.component';
import { BaocaoService } from '../baocao/baocao.service';
import { Baninmau1Component } from './baninmau1/baninmau1.component';
import { Baninmau2Component } from './baninmau2/baninmau2.component';

@Component({
  selector: 'app-banin',
  standalone: true,
  imports: [
    Baninmau1Component,
    Baninmau2Component,
    Baninmau3Component,
  ],
  templateUrl: './banin.component.html',
  styleUrls: ['./banin.component.css']
})
export class BaninComponent implements OnInit {

  constructor() { }
  route: ActivatedRoute = inject(ActivatedRoute);
  _Mau3Service: Mau3Service = inject(Mau3Service);
  _BaocaoService: BaocaoService = inject(BaocaoService);
  DataMau:any[]=[]
  Baocao:any
  idMau:any
  async ngOnInit() {
    this.idMau = this.route.snapshot.params['slug'];
    const ID = this.route.snapshot.params['id'];
    this.DataMau = await this._Mau3Service.getMau3ByidBaocao(ID)
    this.Baocao = await this._BaocaoService.getBaocaoByid(ID)
    console.log(this.idMau);
    console.log(ID);
    console.log(this.DataMau);
    console.log(this.Baocao);

  }

}
