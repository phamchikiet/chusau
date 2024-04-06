import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  CUser: any = {}
  constructor(
    private _UsersService: UsersService,
  ) { }

  ngOnInit() {
    this._UsersService.getProfile().subscribe(data => this.CUser = data)
  }

}
