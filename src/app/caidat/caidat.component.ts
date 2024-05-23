import { Component, ElementRef, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { LichsuService } from '../lichsu/lichsu.service';
import { CaidatService } from './caidat.service';
import {MatDialog, MatDialogActions, MatDialogModule} from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersService } from '../auth/users.service';
@Component({
  selector: 'app-caidat',
  standalone: true,
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
  templateUrl: './caidat.component.html'
})
export class CaidatComponent {
  Ketqua:any={Tieude:''};
  Detail:any={
    HSDGio:0,
    HSDNgay:0,
    HSDThang:0,
    HSDNam:0,
  }
  DVT:any=[
    {id:1,Tieude:'Giờ'},
    {id:2,Tieude:'Ngày'},
    {id:3,Tieude:'Tháng'},
    {id:4,Tieude:'Năm'}
  ]
  SearchParams: any = {
    pageSize:10,
    pageNumber:0,
  };
  IsshowCam:boolean=false;
  displayedColumns: string[] = ['Hoten','SDT', 'Role', 'email','Status','Ngaytao','Action'];
  dataSource!: MatTableDataSource<any>;
  Listdata:any[]=[];
  public showWebcam = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('canvas') canvas!: ElementRef;
  public webcamImage: WebcamImage | undefined;
  private trigger: Subject<void> = new Subject<void>();
  SanphamsDrive:any[]=[]
  FilterLists:any[]=[]
  pageSizeOptions:any
  Total:number=0
  _CaidatService:CaidatService= inject(CaidatService)
  _UsersService:UsersService= inject(UsersService)
  constructor(
    private _LichsuService:LichsuService,
    private dialog: MatDialog,

  ) {
    // this._CaidatService.getAll().subscribe()

  }
  async ngOnInit(): Promise<void> {
    const result = await this._UsersService.SearchUsers(this.SearchParams)
    this.pageSizeOptions = [10, 20, result.totalCount].filter(v => v <= result.totalCount);
    this.Total = result.totalCount
     this._UsersService.users$.subscribe((data:any)=>
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

  onPageChange(event: any) {
      console.log(event);
      this.SearchParams.pageSize = event.pageSize
      this.SearchParams.pageNumber = event.pageIndex
      this._CaidatService.SearchCaidat(this.SearchParams).then(()=>this.ngOnInit())
    }
  text = 'Hello, QR Code!';
  elementType = 'url'; // Other possible values: 'canvas', 'img', 'url'
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent = new ZXingScannerComponent;
  selectedDevice: MediaDeviceInfo | undefined;
  SelectItem: any={};
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
  }
  openZoomDialog(teamplate: TemplateRef<any>,item:any): void {
    this.SelectItem = item
    const dialogRef = this.dialog.open(teamplate, {
    });
  }
  CreateCaidat(data:any)
  {
    this._CaidatService.CreateCaidat(data)
    // .subscribe(()=>
    // {
    //   this._CaidatService.caidats$.subscribe((data:any)=>{
    //     this.dataSource = new MatTableDataSource(data);  
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //    })
    // })
  }
  async UpdateCaidat(data:any)
  {
   const result = await this.getHSD(data);
   data.NgayHSD = result
   console.log(data.NgayHSD);
   
    this._CaidatService.UpdateCaidat(data)
    // .subscribe(()=>
    // {
    //   this._CaidatService.caidats$.subscribe((data)=>{
    //     this.dataSource = new MatTableDataSource(data);  
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //    })
    // })
  }
  async getHSD(data:any) {
    var cDate = new Date(data.Ngaytao);
    cDate.setFullYear(cDate.getFullYear() + data.HSDNam);
    cDate.setMonth(cDate.getMonth() + data.HSDThang);
    cDate.setDate(cDate.getDate() + data.HSDNgay);
    cDate.setHours(cDate.getHours() + data.HSDGio);
    const result = new Date(cDate);
    return result
  }
  DeleteCaidat(data:any)
  {
    this._CaidatService.DeleteCaidat(data)
    // this._CaidatService.deletePage(data).subscribe(()=>
    // {
    //   this._CaidatService.caidats$.subscribe((data)=>{
    //     this.dataSource = new MatTableDataSource(data);  
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //    })
    // })

  }
  Today(){return new Date();}

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage.imageAsDataUrl);
    this.webcamImage = webcamImage;
    this.Detail.Hinhanh = webcamImage.imageAsDataUrl
  }
  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  
  GetPercent(begin:any,end:any)
  { 
    let Thoigian:number=100;
    let now = new Date();
    let startDate = new Date(begin);
    let endDate = new Date(end);
    const timeDiff1 = Math.abs(endDate.getTime() - startDate.getTime());
    const hoursDiff1 = Math.ceil(timeDiff1 / (1000 * 3600));
    const timeDiff2 = Math.abs(endDate.getTime() - now.getTime());
    const hoursDiff2 = Math.ceil(timeDiff2 / (1000 * 3600));
    if(hoursDiff1-hoursDiff2>0)
    {
      Thoigian = Number(((1-((hoursDiff1-hoursDiff2)/hoursDiff1))*100).toFixed(2))
    }
    if (Thoigian >= 80) {
      return { time: Thoigian, color: 'warn' };
    } else if (Thoigian > 50) {
      return { time: Thoigian, color: 'accent' };
    } else {
      return { time: Thoigian, color: 'primary' };
    }
  }
  readExcelFile(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array((e.target as any).result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(jsonData);
      this.writeExcelFile(jsonData)
      // jsonData.forEach((v:any,k:any) => {
      //   setTimeout(() => {
      //     const convertedDate = v.Ngay.replace(/_/g, "/")
      //     v.Ngayformat = new Date(convertedDate)
      //     this.AddChart(v)
      //     console.log(v);
      //   }, 100*k);
      // });
      console.log(jsonData);
    };
    fileReader.readAsArrayBuffer(file);
  }
  writeExcelFile(data:any) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    this.saveAsExcelFile(blob, 'data');
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }

  async LoadDrive(){
   const data = await this._CaidatService.getDrive()
   this.SanphamsDrive = data.values.slice(1).map((row:any) => {
    return {
      Tieude: row[1],
      Mota: row[4],
    };
    });
    console.log(this.SanphamsDrive);
  }
  SyncDrive(){
    this.SanphamsDrive.forEach((v:any)=>
    {
      this._CaidatService.CreateCaidat(v)
    })
   
  }
}
