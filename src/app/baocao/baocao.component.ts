import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FlatTreeControl } from '@angular/cdk/tree';
@Component({
  selector: 'app-baocao',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatTreeModule
  ],
  templateUrl: './baocao.component.html',
  styleUrl: './baocao.component.scss'
})
export class BaocaoComponent {
  showFiller = false;
  isOpen: boolean = false
  SidenavMode: any = 'side'
  MenuBaocao: any = [
    { id: 1, Slug: '', Title: 'Mẫu 0 - TỔNG HỢP THIẾT BỊ KHOA ĐIỆN - ĐIỆN LẠNH',
      children:[
        {id:1,Title:'Báo Cáo 1',Slug:'bao-cao-1'},
        {id:2,Title:'Báo Cáo 2',Slug:'bao-cao-2'},
        {id:3,Title:'Báo Cáo 3',Slug:'bao-cao-3'}
      ]
     },
    { id: 2, Slug: '', Title: 'Mẫu 1 - ĐÁNH GIÁ THIẾT BỊ ĐỊNH KỲ' },
    { id: 3, Slug: '', Title: 'Mẫu 2 - BẢO DƯỠNG THIẾT BỊ ĐỊNH KỲ' },
    { id: 4, Slug: '', Title: 'Mẫu 3 - BẢO DƯỠNG THIẾT BỊ ĐỊNH KỲ' },
  ]
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      Title: node.Title,
      level: level,
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
  constructor(
    private breakpointObserver: BreakpointObserver
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
  ngOnInit(): void {
    this.treedataSource.data = this.MenuBaocao

  }
}
