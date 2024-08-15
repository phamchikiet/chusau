import { Component, ElementRef, QueryList, TemplateRef, ViewChild, ViewChildren, inject } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { LichsuService } from '../lichsu/lichsu.service';
import { ThietbiService } from './thietbi.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import html2canvas from 'html2canvas';
import jsZip from 'jszip';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
@Component({
  selector: 'app-thietbi',
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
  templateUrl: './thietbi.component.html'
})
export class ThietbiComponent {
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
    pageSize:9999,
    pageNumber:0,
    isDelete:false
  };
  IsshowCam:boolean=false;
  displayedColumns: string[] = ['qrcode','hinhanh', 'Tieude', 'Code','Tinhtrang','HSD','NgayHSD','Ngaytao','Action'];
  dataSource!: MatTableDataSource<any>;
  Listdata:any[]=[];
  public showWebcam = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('captureDiv') captureDiv!: ElementRef;
  @ViewChild('qrCodes') qrCodes!: ElementRef;
  @ViewChild('myContainer') myContainer!: ElementRef;
  public webcamImage: WebcamImage | undefined;
  private trigger: Subject<void> = new Subject<void>();
  SanphamsDrive:any[]=[]
  FilterLists:any[]=[]
  pageSizeOptions:any
  Total:number=0
  _ThietbiService:ThietbiService= inject(ThietbiService)
  constructor(
    private _LichsuService:LichsuService,
    private dialog: MatDialog,

  ) {
    // this._ThietbiService.getAll().subscribe()

  }
  @ViewChild('parentContainer',{static:true}) parentContainerRef!: ElementRef;
  @ViewChildren('dynamicElement') dynamicElements!: QueryList<ElementRef>;
  async ngOnInit(): Promise<void> {

   await this._ThietbiService.SearchThietbi(this.SearchParams)
    // this.pageSizeOptions = [10, 20, result.totalCount].filter(v => v <= result.totalCount);
    // this.Total = result.totalCount
     this._ThietbiService.thietbis$.subscribe((data)=>
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
  createZip() {
    const zip = new JSZip();
    const promises:any = [];

    this.Listdata.forEach((value, index) => {
      const element = this.parentContainerRef.nativeElement.querySelector('#abc' + index);
      if (!element) {
        console.warn(`Element with id #abc${index} not found. Skipping.`);
        return;
      }

      const promise = html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        if (imgData) {
          const parts = imgData.split(',');
          const base64Data = parts[1];
          zip.file(`qr_code_${index + 1}.png`, base64Data, { base64: true });
        }
        return Promise.resolve(); // Resolve the promise
      });
      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      zip.generateAsync({ type: 'blob' }).then((content) => {
        FileSaver.saveAs(content, 'qr_codes.zip');
      });
    });
  }
  saveAsImage(item:any) {
    html2canvas(this.captureDiv.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      // Option 1: Download directly
      const link = document.createElement('a');
      link.download = `${item.Code}.png`;
      link.href = imgData;
      link.click();

      // Option 2: Display the image on the page (uncomment to use)
      // const image = new Image();
      // image.src = imgData;
      // document.body.appendChild(image);
    });
    // fetches base 64 date from image
    // const parentElement = parent.el.nativeElement.querySelector("img").src;

    // // converts base 64 encoded image to blobData
    // let blobData = this.convertBase64ToBlob(parentElement);

    // // saves as image
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
    //   window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
    // } else { // chrome
    //   const blob = new Blob([blobData], { type: "image/png" });
    //   const url = window.URL.createObjectURL(blob);
    //   // window.open(url);
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.download = 'Qrcode';
    //   link.click();
    // }

  }
  onPageChange(event: any) {
      console.log(event);
      this.SearchParams.pageSize = event.pageSize
      this.SearchParams.pageNumber = event.pageIndex
      this._ThietbiService.SearchThietbi(this.SearchParams).then(()=>this.ngOnInit())
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
  CreateThietbi(data:any)
  {
    this._ThietbiService.CreateThietbi(data).then(()=>this.ngOnInit())
  }
  async UpdateThietbi(data:any)
  {
   console.log(data.NgayHSD);
    this._ThietbiService.UpdateThietbi(data)
    // .subscribe(()=>
    // {
    //   this._ThietbiService.thietbis$.subscribe((data)=>{
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //    })
    // })
  }
  DeleteThietbi(data:any)
  {
    this._ThietbiService.DeleteThietbi(data).then(()=>this.ngOnInit())
  }
  Today(){return new Date();}

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage.imageAsDataUrl);
    this.webcamImage = webcamImage;
    this.Detail.Hinhanh = webcamImage.imageAsDataUrl
  }

  onUpload() {

    // const filePath = `images/${this.selectedFile.name}`;
    // const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(filePath, this.selectedFile);  
    // // Observe the upload progress
    // this.uploadPercent = task.percentageChanges();

    // // Get the download URL when the upload is complete
    // task.snapshotChanges().pipe(
    //   finalize(() => {
    //     this.downloadURL = fileRef.getDownloadURL();
    //   })
    // ).subscribe();
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
    const exportData = data.map((v:any)=>({
      Tieude:v.Tieude,
      Code:v.Code,
      Mota:v.Mota,
      HSD:v.HSD,
    }))
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
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
   const data = await this._ThietbiService.getDrive()
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
      this._ThietbiService.CreateThietbi(v)
    })

  }
}
