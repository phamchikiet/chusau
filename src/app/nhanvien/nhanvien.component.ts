import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NhanvienService } from './nhanvien.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QRCodeModule } from 'angularx-qrcode';
import { WebcamModule } from 'ngx-webcam';
@Component({
  selector: 'app-nhanvien',
  standalone:true,
  imports: [
    MatDialogModule,
    MatTableModule,
    QRCodeModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTooltipModule,
    CommonModule,
    WebcamModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent implements OnInit {
  User:any={}
  ListCloud:any[]=[]
  ListUser:any[]=[]
  displayedColumns: string[] = ['Hoten', 'email', 'SDT','Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions:any
  Total:number=0
  Listdata:any[]=[];
  SearchParams: any = {
    pageSize:10,
    pageNumber:0,
  };
  constructor(
    private _NhanvienService:NhanvienService,
    private _NotifierService:NotifierService,
    private dialog: MatDialog,
  ) {}

  async ngOnInit() {
    const result = await this._NhanvienService.SearchNhanvien(this.SearchParams)
    this.pageSizeOptions = [10, 20, result.totalCount].filter(v => v <= result.totalCount);
    this.Total = result.totalCount
     this._NhanvienService.nhanviens$.subscribe((data:any)=>
     {
       if(data)
       {  
       this.Listdata = data
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       }
     })

  }
  async LoadDrive()
  {
    const data = await this._NhanvienService.getDrive();
    //this.ListCloud =  ConvertDriveData(data.values)
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
        this._NhanvienService.CreateNhanvien(this.User).then((data:any)=>
        {
          console.log(data);
          
          if(data[0]==false)
            {
              this._NotifierService.notify('error',data[1])
            }
            else
            {
              this._NotifierService.notify('success','Thêm Thành Công')
              this._NhanvienService.nhanviens$.subscribe((data:any)=>
                {
                  console.log(data);
                  this.dataSource = new MatTableDataSource(data);
                })
            }
          })
      }
      else
      {
        this._NhanvienService.UpdateNhanvien(this.User).then(()=>
        {
          this._NotifierService.notify('success','Cập Nhật Thành Công')
          this._NhanvienService.nhanviens$.subscribe((data:any)=>
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
XoaDialog(teamplate: TemplateRef<any>,item:any): void {
  const dialogRef = this.dialog.open(teamplate, {
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result == 'true') {
      this._NhanvienService.DeleteNhanvien(item.id).then(() => location.reload())
    }
  });
}


ChangePass(data: any): void {
  if (data.newpass != data.newpass2) {
    console.log(data);
    this._NotifierService.show({
      message: 'Xác nhận mật khẩu mới không trùng khớp',
      type: 'error',
    });
  } else {
    const dulieu = {
      User: this.User, 
      oldpass: data.oldpass,
      newpass: data.newpass,
    };
    this._NhanvienService.changepass(dulieu).then((data: any) => { // Add type annotation to data parameter
      if (data[0]) {
       // this.Data = { user: '', oldpass: '', newpass: '' }; // Replace Data with User
        this._NotifierService.show({
          message: data[1],
          type: 'success',
        });
      } else {
        this._NotifierService.show({
          message: data[1],
          type: 'error',
        });
      }
    });
  }
}



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
