import { Routes } from '@angular/router';
import { GuestGuard } from './auth/guards/guest.guard';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { DangkyComponent } from './dangky/dangky.component';
import { Baninmau1Component } from './banin/baninmau1/baninmau1.component';
import { BaninComponent } from './banin/banin.component';

export const routes: Routes = [
    { path: '', redirectTo: 'lichsu', pathMatch: 'full' },
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadComponent: () => import('./main/main.component').then(comp => comp.MainComponent),
        children: [
            { path: 'thietbi', loadComponent: () => import('./thietbi/thietbi.component').then(comp => comp.ThietbiComponent) },
            { path: 'lichsu', loadComponent: () => import('./lichsu/lichsu.component').then(comp => comp.LichsuComponent) },
            { path: 'caidat', loadComponent: () => import('./caidat/caidat.component').then(comp => comp.CaidatComponent) },
            { path: 'scan', loadComponent: () => import('./scan/scan.component').then(comp => comp.ScanComponent) },
            { path: 'taikhoan', loadComponent: () => import('./taikhoan/taikhoan.component').then(comp => comp.TaikhoanComponent) },
            { path: 'baocao', loadComponent: () => import('./baocao/baocao.component').then(comp => comp.BaocaoComponent) },
            { path: 'baocao/:slug', loadComponent: () => import('./baocao/baocao.component').then(comp => comp.BaocaoComponent) },
        ]
    },
    {
        path: 'banin/:slug/:id',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: BaninComponent,
    },
    {
        path: 'dangnhap',
        canActivate: [GuestGuard],
        canActivateChild: [GuestGuard],
        component: DangnhapComponent,
    },
    {
        path: 'dangky',
        canActivate: [GuestGuard],
        canActivateChild: [GuestGuard],
        component: DangkyComponent,
    },
    { path: '**', redirectTo: 'lichsu' }
];
