import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../auth/users.service';
@Component({
  selector: 'app-dangky',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './dangky.component.html',
  styleUrl: './dangky.component.scss'
})
export class DangkyComponent {
  User: any = {};
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  signInForm!: any;
  signUpForm!: any;
  isDangky = false
  constructor(
    private _router: Router,
    private _notifierService: NotifierService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _UsersService: UsersService,
  ) {}

  ngOnInit(): void {}
  Dangky(user: any) {
    if (user.SDT == undefined || user.SDT == '') {
      this._notifierService.show({
        message: 'Vui lòng nhập số điện thoại',
        type: 'error',
      });
    } 
    else if (user.email == undefined || user.email == '') {
      this._notifierService.show({
        message: 'Vui lòng nhập Email',
        type: 'error',
      });
    }
    else if (user.password == undefined || user.password == '') {
      this._notifierService.show({
        message: 'Vui lòng nhập Mật Khẩu',
        type: 'error',
      });
    }
    else if (user.confirmpassword == undefined || user.password != user.confirmpassword) {
      this._notifierService.show({
        message: 'Mật khẩu không trùng nhau',
        type: 'error',
      });
    } else {
      this._UsersService.Dangky(user).subscribe(data => {
        console.log(data);
        if (!data[0]) {
          this._notifierService.show({
            message: data[1],
            type: 'error',
          });
        }
        else
        {
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/';
          this._router.navigateByUrl(redirectURL);
        }
      });
    }
  }
}
