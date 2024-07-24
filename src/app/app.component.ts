import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { UsersInterceptor } from './auth/users.interceptor';
import { NotifyModule } from './notify.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AuthModule,
    NotifyModule
  ],
  providers: [
    NotifierService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'site';
}
