import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-baninmau1',
  standalone:true,
  templateUrl: './baninmau1.component.html',
  styleUrls: ['./baninmau1.component.css']
})
export class Baninmau1Component implements OnInit {
  @Input() DataMau:any[]=[];
  @Input() Baocao:any={};
  constructor() { }

  ngOnInit() {
    window.print();
  }

}
