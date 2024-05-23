import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { Observable, Subject } from 'rxjs';
import { QRCodeModule } from 'angularx-qrcode';
import { WebcamImage } from 'ngx-webcam';
import { NotifierOptions, NotifierService } from 'angular-notifier';
import { ThietbiService } from '../thietbi/thietbi.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LichsuService } from '../lichsu/lichsu.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LichsuComponent } from '../lichsu/lichsu.component';
import { UsersService } from '../auth/users.service';
@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [
    ZXingScannerModule,
    QRCodeModule,
    MatButtonModule,
    MatTableModule,
    MatPaginator,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    LichsuComponent
  ],
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScanComponent implements OnInit {
  IsshowCam: boolean = false;
  @ViewChild('canvas') canvas!: ElementRef;
  private trigger: Subject<void> = new Subject<void>();
  public showWebcam = true;
  @ViewChild('scanner', { static: false })
  ListLichsu: any[] = []
  profile: any = {}
  scanner: ZXingScannerComponent = new ZXingScannerComponent;
  selectedDevice: MediaDeviceInfo | undefined;
  _NotifierService: NotifierService = inject(NotifierService)
  _ThietbiService: ThietbiService = inject(ThietbiService)
  _LichsuService: LichsuService = inject(LichsuService)
  _UsersService: UsersService = inject(UsersService)

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this._UsersService.getProfile()
    this._UsersService.profile$.subscribe((data: any) => {
      this.profile = data
    })
    this._LichsuService.SearchThietbi({})
    this._LichsuService.lichsus$.subscribe((data: any) => {
      // console.log(data);  
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Reload() {
    window.location.reload()
  }
  stopScanner() {
    this.IsshowCam = false
    if (this.scanner) {
      this.scanner.scanStop();
    }
  }
  startScanner() {
    this.IsshowCam = true
    console.log(this.scanner);

    if (this.scanner) {
      this.selectedDevice = this.scanner.device;
      this.scanner.scanStart();
    }
  }
  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage.imageAsDataUrl);
    //this.webcamImage = webcamImage;
    //this.Detail.Hinhanh = webcamImage.imageAsDataUrl
  }
  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  onCamerasFound(devices: MediaDeviceInfo[]): void {
    console.log('Devices: ', devices);
    if (devices?.length > 0) {
      // this.scanner.device = this.selectedDevice = devices[1];
    }
  }
  async onScanSuccess(data: string) {
    this.IsshowCam = true
    const thietbi = await this._ThietbiService.getThietbiByid(data)
    const result = await this._LichsuService.getByidUser({ idUser: this.profile.id, idTB: data })
    result.idUser = this.profile.id
    if (result.error >= 200 && result.error < 300) {
      this._NotifierService.notify('success', result.data)
    }
    else {
      this._NotifierService.notify('error', result.data)
    }
    // this._TelegramService.SendLogdev(result)
    // this._TelegramService.SendLogdev(result1)
    // if(result)
    // {
    //   if(result.error==0)
    //   {
    //       let dulieu: any = {};
    //       // dulieu.idTao = dulieu.idUser = this.CUser.id
    //       // dulieu.idTB = result.id
    //       // dulieu.Type = result.Tinhtrang = !result.Tinhtrang
    //       // this._QrcodeService.updatePage(result).subscribe();
    //       // this._LichsuService.createPage(dulieu).subscribe((data) => {
    //       //   this.router.navigateByUrl('/lichsu');
    //       // })
    //       this._NotifierService.notify('success', 'Check in thành công')
    //   }
    //   else {
    //       this._NotifierService.notify('error', 'Thiết bị đã được sử dụng bởi nhân viên khác')
    //     }
    // }
    // else{
    //   this._NotifierService.notify('error', 'Thiết bị không tồn tại trong hệ thống')
    // }
  }
}
