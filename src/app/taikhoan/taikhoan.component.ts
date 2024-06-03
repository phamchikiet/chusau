import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../auth/users.service';
import { NhanvienService } from '../nhanvien/nhanvien.service';
import { NotifierService } from 'angular-notifier';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-taikhoan',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './taikhoan.component.html',
  styleUrl: './taikhoan.component.scss'
})
export class TaikhoanComponent {
  token: any = localStorage.getItem('CSVC_Token') || null
  Detail: any = {}
  ChangePass: any = {}
  _UsersService: UsersService = inject(UsersService)
  _NhanvienService: NhanvienService = inject(NhanvienService)
  _NotifierService: NotifierService = inject(NotifierService)
  _AuthService: AuthService = inject(AuthService)
  ngOnInit() {
    if (this.token) {
      this._UsersService.getProfile();
      this._UsersService.profile$.subscribe((profile: any) => {
        if (profile) {
          this.Detail = profile
        }
      })
    }
  }

  changePassword() {
    if (this.Detail.newpass != this.Detail.confirmnewpass) {
      this._NotifierService.notify('error', 'Mật khẩu không khớp')
    }
    else if (this.Detail.newpass.length < 6) {
      this._NotifierService.notify('error', 'Mật khẩu phải có ít nhất 6 kí tự')
    }
    else {
      this._NhanvienService.changepass(this.Detail).then((data: any) => {
        this._NotifierService.notify('success', 'Đổi mật khẩu thành công')
      })
    }
  }
  Update()
  {
    this._NhanvienService.UpdateNhanvien(this.Detail).then((data: any) => {
      this._NotifierService.notify('success', 'Cập nhật thành công')
    })
  }
  Logout() {
    this._AuthService.Dangxuat().subscribe(() => {
      this._NotifierService.notify('success', 'Đăng xuất thành công')
      setTimeout(() => {
        window.location.reload()
      }, 100);
    })
  }
}
