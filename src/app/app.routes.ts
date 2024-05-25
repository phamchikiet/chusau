import { Routes } from '@angular/router';
import { GuestGuard } from './auth/guards/guest.guard';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { AuthGuard } from './auth/guards/auth.guard';

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
        path: 'dangnhap',
        canActivate: [GuestGuard],
        canActivateChild: [GuestGuard],
        component: DangnhapComponent,
    },
    // { path: 'about', loadChildren: './about/about.module#AboutModule' },
    // { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
    // { path: 'products', loadChildren: './products/products.module#ProductsModule' },
    // { path: 'product/:id', loadChildren: './product/product.module#ProductModule' },
    // { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
    // { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule' },
    // { path: 'order', loadChildren: './order/order.module#OrderModule' },
    // { path: 'order/:id', loadChildren: './order/order.module#OrderModule' },
    // { path: 'account', loadChildren: './account/account.module#AccountModule' },
    // { path: 'account/:id', loadChildren: './account/account.module#AccountModule' },
    // { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    // { path: 'admin/:id', loadChildren: './admin/admin.module#AdminModule' },
    { path: '**', redirectTo: 'home' }
];
