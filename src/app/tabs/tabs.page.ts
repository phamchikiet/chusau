import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonCard, IonCardContent, IonRouterOutlet, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
  IonTabs, 
  IonTabBar, 
  IonTabButton,
  IonIcon,
  IonLabel,
  CommonModule,
  IonCard,
  IonCardContent,
  IonRouterOutlet,
  IonHeader
],
})
export class TabsPage {
  Menus:any[]=[
    {id:1,icon:"account_circle",Title:'Tài Khoản',Slug:'taikhoan'},
    {id:2,icon:"history",Title:'Lịch Sử',Slug:'lichsu'},
    {id:3,icon:"qr_code_scanner",Title:'',Slug:'qrcode'},
    {id:4,icon:"devices_other",Title:'Thiết Bị',Slug:'thietbi'},
    {id:5,icon:"manufacturing",Title:'Cài Đặt',Slug:'caidat'},
  ]
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ triangle, ellipse, square });
  }
}
