import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-baninmau2',
  standalone:true,
  templateUrl: './baninmau2.component.html',
  styleUrls: ['./baninmau2.component.css']
})
export class Baninmau2Component implements OnInit {
  @Input() DataMau:any[]=[];
  @Input() Baocao:any={};
  constructor() { }

  ngOnInit() {
  }

}
