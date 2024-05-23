import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { UsersService } from '../auth/users.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { UsersInterceptor } from '../auth/users.interceptor';
import { AuthModule } from '../auth/auth.module';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatSidenavModule, 
    MatButtonModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showFiller = false;
  items: any[] | undefined;
  token:any=localStorage.getItem('CSVC_Token')||null
  profile:any
  _UsersService:UsersService =inject(UsersService)
  ngOnInit() {
      this.items = [
          {
              title: 'Quét Mã',
              icon: 'qr_code_scanner',
              link:'scan'
          },
          {
              title: 'Thiết Bị',
              icon: 'devices_other',
              link:'thietbi'
          },
          {
              title: 'Lịch Sử',
              icon: 'history',
              link:'lichsu'
          },
          {
              title: 'Báo Cáo',
              icon: 'assignment',
              link:'baocao'  
          },
          {
              title: 'Cài Đặt',
              icon: 'manufacturing',
              link:'caidat'
          },
          {
              title: 'Tài Khoản',
              icon: 'account_circle',
              link:'taikhoan'
          }
      ]      
      if(this.token){
        this._UsersService.getProfile();
        this._UsersService.profile$.subscribe((profile:any)=>{
          if(profile){
            this.profile=profile
          }
        })
      }
  }

  Dangonline:any=(Math.random()*100).toFixed()
  Homnay:any=(Math.random()*2000).toFixed()
  Homqua:any=(Math.random()*3000).toFixed()
  Tongcong:any=Number(this.Dangonline)+Number(this.Homnay)+Number(this.Homqua)
}
