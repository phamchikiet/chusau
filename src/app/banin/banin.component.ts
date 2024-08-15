import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Baninmau3Component } from './baninmau3/baninmau3.component';
import { Baninmau1Component } from './baninmau1/baninmau1.component';
import { Baninmau2Component } from './baninmau2/baninmau2.component';
import { CommonModule } from '@angular/common';
import { Baninmau0Component } from './baninmau0/baninmau0.component';

@Component({
  selector: 'app-banin',
  standalone: true,
  imports: [
    CommonModule,
    Baninmau0Component,
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
  idBaocao:any
  idMau:any
  async ngOnInit() {
    this.idMau= this.route.snapshot.params['slug'];
    this.idBaocao = this.route.snapshot.params['id'];
    console.log('idMau',this.idMau);
    console.log(this.idBaocao);

  }

}
