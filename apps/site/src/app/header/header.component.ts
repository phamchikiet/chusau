import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AuthService } from '../admin/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  CUser: any = {}
  Token:any = localStorage.getItem('CSVC_Token')||'';
  constructor(
    private _UsersService: UsersService,
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    this._UsersService.getProfile().subscribe(data => this.CUser = data)
  }
  logout() {
    this._authService.Dangxuat().subscribe(()=>{location.reload()});
  }

}
