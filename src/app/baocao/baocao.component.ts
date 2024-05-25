import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BaocaoService } from './baocao.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Mau0Component } from './mau0/mau0.component';
import { Mau1Component } from './mau1/mau1.component';
import { Mau2Component } from './mau2/mau2.component';
import { Mau3Component } from './mau3/mau3.component';
@Component({
  selector: 'app-baocao',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatTreeModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    RouterLink,
    Mau0Component,
    Mau1Component,
    Mau2Component,
    Mau3Component
  ],
  templateUrl: './baocao.component.html',
  styleUrl: './baocao.component.scss'
})
export class BaocaoComponent implements OnInit  {
  DPI = 300
  WidthA4 = '2481px';
  HeightA4 = '3508px';
  showFiller = false;
  isOpen: boolean = false
  SidenavMode: any = 'side'
  MenuBaocao: any = [
    { id: 1, Slug: '', Title: 'Mẫu 0 - TỔNG HỢP THIẾT BỊ KHOA ĐIỆN - ĐIỆN LẠNH'},
    { id: 2, Slug: '', Title: 'Mẫu 1 - ĐÁNH GIÁ THIẾT BỊ ĐỊNH KỲ' },
    { id: 3, Slug: '', Title: 'Mẫu 2 - BẢO DƯỠNG THIẾT BỊ ĐỊNH KỲ' },
    { id: 4, Slug: '', Title: 'Mẫu 3 - BẢO DƯỠNG THIẾT BỊ ĐỊNH KỲ' },
  ]
  Maubaocao:any[]=[
    {id:1,Title:'Báo Cáo TỔNG HỢP THIẾT BỊ KHOA ĐIỆN - ĐIỆN LẠNH'},
    {id:2,Title:'Báo Cáo ĐÁNH GIÁ THIẾT BỊ ĐỊNH KỲ'},
    {id:3,Title:'Báo Cáo BẢO DƯỠNG THIẾT BỊ ĐỊNH KỲ'},
    {id:4,Title:'Báo Cáo BẢO DƯỠNG THIẾT BỊ ĐỊNH KỲ'},
  ]
  List:any[]=[]
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      Title: node.Title,
      level: level,
      Slug:node.Slug,
      Type:node.Type
    };
  };
  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  treedataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: any) => node.expandable;
  _BaocaoService:BaocaoService = inject(BaocaoService)
  SelectItem: any = {}
  Detail: any = {}
  Baocao: any = {}
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall])
      .subscribe(async (breakpoints: any) => {
        // console.log(breakpoints.matches);
        if (breakpoints.matches) {
          this.isOpen = false
          this.SidenavMode = 'over'
        } else {
          this.isOpen = true
          this.SidenavMode = 'side'
        }
      })
  }

  async ngOnInit(){
   const List = await this._BaocaoService.getAllBaocao()
   this.MenuBaocao.forEach((v:any) => {
    v.children = List.filter((v1:any)=>v1.idDM == v.id)
   });
   const Slug = this.route.snapshot.params['slug'];
   if(Slug)
    {
      this.Baocao = List.find((v:any)=>v.Slug==Slug)
      console.log(this.Baocao);
    }
   console.log(Slug);
   console.log(List);
   console.log(this.MenuBaocao);
   
    this.treedataSource.data = this.MenuBaocao
  }
  FillSlug() {
    this.Detail.Slug =  this.Detail.Title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[àáảạãâầấẩậẫăằắẳặẵ]/g, 'a')
    .replace(/[èéẻẹẽêềếểệễ]/g, 'e')
    .replace(/[ìíỉịĩ]/g, 'i')
    .replace(/[òóỏọõôồốổộỗơờớởợỡ]/g, 'o')
    .replace(/[ùúủụũưừứửựữ]/g, 'u')
    .replace(/[ỳýỷỵỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9-]/g, '');
  }
  applyFilter(event:any)
  {
    console.log(event);
    
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.Detail.Type = "baocao"
        this._BaocaoService.CreateBaocao(this.Detail).then(() => this.ngOnInit())
      }
    });
  }
  XoaDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this._BaocaoService.DeleteBaocao(this.SelectItem).then(() => this.ngOnInit())
      }
    });
  }
}
