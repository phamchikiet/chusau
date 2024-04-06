import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { NotifierService } from 'angular-notifier';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConvertDriveData } from '../shared/shared.utils';
import { MatDialog } from '@angular/material/dialog';
import { log } from 'console';

@Component({
  selector: 'app-caidat',
  templateUrl: './caidat.component.html',
  styleUrls: ['./caidat.component.css']
})
export class CaidatComponent implements OnInit {
  User:any={}
  ListCloud:any[]=[]
  ListUser:any[]=[]
  displayedColumns: string[] = ['Hoten', 'email', 'SDT'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _UsersService:UsersService,
    private _NotifierService:NotifierService,
    private dialog: MatDialog,
  ) {
    this._UsersService.getUsers().subscribe(data=>
      {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
      })
      this._UsersService.users$.subscribe((data)=>{if(data){this.User = data}})
   }

  ngOnInit() {

  }
  async LoadDrive()
  {
    const data = await this._UsersService.getDrive();
    this.ListCloud =  ConvertDriveData(data.values)
    console.log(this.ListCloud);
    
    this.dataSource = new MatTableDataSource(this.ListCloud);    
  }
  async SyncDrive()
  {

  }
openDialog(teamplate: TemplateRef<any>,item:any,type:any): void {
  if(type=='add')
  {
    this.User = {}
  }
  else
  {
    this.User = item
  }
  const dialogRef = this.dialog.open(teamplate, {
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result == 'true') {
      if(type=='add')
      {
        this._UsersService.Dangky(this.User).subscribe((data)=>
        {
          console.log(data);
          
          if(data[0]==false)
            {
              this._NotifierService.notify('error',data[1])
            }
            else
            {
              this._NotifierService.notify('success','Thêm Thành Công')
              this._UsersService.getUsers().subscribe(data=>
                {
                  console.log(data);
                  this.dataSource = new MatTableDataSource(data);
                })
            }
          })
      }
      else
      {
        this._UsersService.updateUser(this.User).subscribe(()=>
        {
          this._NotifierService.notify('success','Cập Nhật Thành Công')
          this._UsersService.getUsers().subscribe(data=>
            {
              console.log(data);
              this.dataSource = new MatTableDataSource(data);
            })
          
        });
      }
   //   this._SanphamService.CreateSanpham(this.Detail).then(() => this.ngOnInit())
    }
  });
}
  // Dangky(User:any)
  // {
  //   this._UsersService.Dangky(User).subscribe((data)=>this._NotifierService.notify('success','Thêm Thành Công'));
  // }
  // Update(User:any)
  // {
  //   this._UsersService.updateUser(User).subscribe((data)=>this._NotifierService.notify('success','Thêm Thành Công'));
  // }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
