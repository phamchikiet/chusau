import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-baninmau3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './baninmau3.component.html',
  styleUrls: ['./baninmau3.component.css']
})
export class Baninmau3Component implements OnInit {
  @Input() DataMau:any[]=[];
  @Input() Baocao:any={};
  constructor() { }

  ngOnInit() {
    console.log(this.DataMau);
    console.log(this.Baocao);

  }

}
