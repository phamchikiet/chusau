import { Component, Input, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ThietbiService } from '../../thietbi/thietbi.service';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { OverlayModule } from '@angular/cdk/overlay';
import { HangmucService } from '../../hangmuc/hangmuc.service';
import { CauhinhService } from '../../cauhinh/cauhinh.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Mau1Service } from './mau1.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-mau1',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    OverlayModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './mau1.component.html',
  styleUrls: ['./mau1.component.css']
})

export class Mau1Component implements OnInit {
  @Input() Baocao: any
  displayedColumns: string[] = [
    'STT', 'Hangmuc', 'Tinhtrang', 'Ngaykiemtra', 'Ghichu'
  ];
  DataMau: any[] = []
  dataSource: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  TSCD: any[] = []
  FilterTSCD: any[] = []
  Hangmuc: any[] = []
  FilterHangmuc: any[] = []
  Trangthai: any[] = []
  FilterTrangthai: any[] = []
  Detail: any = { Chitiet: [] }
  SelectItem: any = {}
  _ThietbiService: ThietbiService = inject(ThietbiService)
  _HangmucService: HangmucService = inject(HangmucService)
  _CauhinhService: CauhinhService = inject(CauhinhService)
  _Mau1Service: Mau1Service = inject(Mau1Service)
  input2: any = ''
  input3: any = ''
  async Addrow() {
      const item = {
      TenTSCD: "",
        Chitiet:[],
      idBaocao: this.Baocao.id
    }
    this.DataMau = [item,...this.DataMau]
    // const item = {
    //   TenTSCD: "",
    //   Hangmuc: "",
    //   Tinhtrang: "",
    //   Ngaykiemtra: new Date(),
    //   idBaocao: this.Baocao.id
    // }
    // this._Mau1Service.CreateMau1(item).then(async () => {
    //   this.DataMau = await this._Mau1Service.getMau1ByidBaocao(this.Baocao.id)
    //   this.dataSource = new MatTableDataSource(this.DataMau);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // })

  }
  constructor(
    private dialog: MatDialog,
    private _NotifierService: NotifierService,
  ) { }
  async ngOnInit() {
    this.TSCD = this.FilterTSCD = await this._ThietbiService.getAllThietbi()
    this.Hangmuc = this.FilterHangmuc = await this._HangmucService.getAllHangmuc()
    this.DataMau = await this._Mau1Service.getMau1ByidBaocao(this.Baocao.id)
    const Trangthai = await this._CauhinhService.getCauhinhBySlug('trangthai')
    this.idTrangthai = Trangthai?.id
    this.Trangthai = this.FilterTrangthai = Trangthai?.Data
    this.LoadDataSource()
  }
  LoadDataSource() {
    this.DataMau.forEach((v, k) => {
      this.dataSource[k] = new MatTableDataSource(v.Chitiet);
      this.dataSource[k].paginator = this.paginator;
      this.dataSource[k].sort = this.sort;
    });
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.Detail.idBaocao = this.Baocao.id
        this._Mau1Service.CreateMau1(this.Detail).then(() =>{
          this._NotifierService.notify("success","Thêm Thành Công")
          this.ngOnInit()
        }
      )}});
  }
  openDialogCauhinh(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result == 'true') {
    //     this.Detail.idBaocao = this.Baocao.id
    //     this._Mau1Service.CreateMau1(this.Detail).then(() =>{
    //       this._NotifierService.notify("success","Thêm Thành Công")
    //       this.ngOnInit()
    //     }
    //   )}});
  }
  openPrintDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {

    });
  }
  AddChitiet(index: any) {
    this.DataMau[index].Chitiet.unshift({ Hangmuc: '', Tinhtrang: '', Ngaykiemtra: '', Ghichu: '' })
    this.LoadDataSource()
  }

  XoaDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this._Mau1Service.DeleteMau1(this.SelectItem).then(() =>{
          this._NotifierService.notify("success","Xoá Thành Công")
          this.ngOnInit()
        }
        )
      }
    });
  }

  DeleteItem(item: any, index: any) {
    item.Chitiet = item.Chitiet.slice(0, index).concat(item.Chitiet.slice(index + 1))
    this._Mau1Service.UpdateMau1(item).then(() => this.ngOnInit())
  }

  Overlay1: any = {}
  Overlay2: any = []
  Overlay3: any = []
  Overlay4: any = []
  Overlay5: any = []
  Overlay6: any = []
  Overlay7: any = []
  idTrangthai: any = ''
  triggerOrigin: any;
  toggle1(trigger: any, index: any) {
    this.triggerOrigin = trigger;
    this.Overlay1[index] = true
  }
  toggle2(trigger: any, index: any, index1: any) {
    this.triggerOrigin = trigger;
    const item = this.Overlay2.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    if (item) {
      const findIndex = this.Overlay2.findIndex((v: any) => {
        return v.index == index && v.index1 == index1
      })
      this.Overlay2[findIndex].value = true
    }
    else {
      this.Overlay2.push({ index: index, index1: index1, value: true })
    }
    console.log(this.Overlay2);
  }
  backdrop2(index: any, index1: any) {
    const item = this.Overlay2.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    console.log(item);

    if (item) {
      const findIndex = this.Overlay2.findIndex((v: any) => {
        return v.index == index && v.index1 == index1
      })
      this.Overlay2[findIndex].value = false
    }
    else {
      this.Overlay2.push({ index: index, index1: index1, value: false })
    }
  }
  backdrop3(index: any, index1: any) {
    const item = this.Overlay3.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    console.log(item);

    if (item) {
      const findIndex = this.Overlay3.findIndex((v: any) => {
        return v.index == index && v.index1 == index1
      })
      this.Overlay3[findIndex].value = false
    }
    else {
      this.Overlay3.push({ index: index, index1: index1, value: false })
    }
  }
  backdrop4(index: any, index1: any) {
    const item = this.Overlay4.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    console.log(item);

    if (item) {
      const findIndex = this.Overlay4.findIndex((v: any) => {
        return v.index == index && v.index1 == index1
      })
      this.Overlay4[findIndex].value = false
    }
    else {
      this.Overlay4.push({ index: index, index1: index1, value: false })
    }
  }
  backdrop5(index: any, index1: any) {
    const item = this.Overlay5.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    console.log(item);

    if (item) {
      const findIndex = this.Overlay5.findIndex((v: any) => {
        return v.index == index && v.index1 == index1
      })
      this.Overlay5[findIndex].value = false
    }
    else {
      this.Overlay5.push({ index: index, index1: index1, value: false })
    }
  }
  backdrop6(index: any, index1: any) {
    const item = this.Overlay6.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    console.log(item);

    if (item) {
      const findIndex = this.Overlay6.findIndex((v: any) => {
        return v.index == index && v.index1 == index1
      })
      this.Overlay6[findIndex].value = false
    }
    else {
      this.Overlay6.push({ index: index, index1: index1, value: false })
    }
  }
  backdrop7(index: any, index1: any) {
    const item = this.Overlay7.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    console.log(item);

    if (item) {
      const findIndex = this.Overlay7.findIndex((v: any) => {
        return v.index == index && v.index1 == index1
      })
      this.Overlay7[findIndex].value = false
    }
    else {
      this.Overlay7.push({ index: index, index1: index1, value: false })
    }
  }


  toggle3(trigger: any, index: any, index1: any) {
    this.triggerOrigin = trigger;
    const item = this.Overlay3.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    if (item) {
      const findIndex = this.Overlay3.findIndex((v: any) => {
        return v.index == index && v.index1 == index1
      })
      this.Overlay3[findIndex].value = true
    }
    else {
      this.Overlay3.push({ index: index, index1: index1, value: true })
    }
    console.log(this.Overlay3);
  }

  toggle4(trigger: any, index: any, index1: any) {
    this.triggerOrigin = trigger;
    const item = this.Overlay4.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    if (item) {
      const findIndex = this.Overlay4.findIndex((v: any) => {
        return v.index == index && v.index1 == index1
      })
      this.Overlay4[findIndex].value = true
    }
    else {
      this.Overlay4.push({ index: index, index1: index1, value: true })
    }
    console.log(this.Overlay4);
  }
  toggle5(trigger: any, index: any, index1: any) {
    this.triggerOrigin = trigger;
    const item = this.Overlay5.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    if (item) {
      const findIndex = this.Overlay5.findIndex((v: any) => {
        return v.index == index && v.index1 == index1
      })
      this.Overlay5[findIndex].value = true
    }
    else {
      this.Overlay5.push({ index: index, index1: index1, value: true })
    }
    console.log(this.Overlay5);
  }
  toggle6(trigger: any, index: any, index1: any) {
    this.triggerOrigin = trigger;
    const item = this.Overlay6.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    if (item) {
      const findIndex = this.Overlay6.findIndex((v: any) => {
        return v.index == index && v.index1 == index1
      })
      this.Overlay6[findIndex].value = true
    }
    else {
      this.Overlay6.push({ index: index, index1: index1, value: true })
    }
    console.log(this.Overlay6);
  }
  toggle7(trigger: any, index: any, index1: any) {
    this.triggerOrigin = trigger;
    const item = this.Overlay7.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    if (item) {
      const findIndex = this.Overlay7.findIndex((v: any) => {
        return v.index == index && v.index1 == index1
      })
      this.Overlay7[findIndex].value = true
    }
    else {
      this.Overlay7.push({ index: index, index1: index1, value: true })
    }
    console.log(this.Overlay7);
  }
  GetOverlay(List: any, index: any, index1: any) {
    const item = List.find((v: any) => {
      return v.index == index && v.index1 == index1
    })
    if (item) {
      return item.value
    }
    else {
      return false
    }
  }

  FilterOverlay1(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 1) {
      this.FilterTSCD = this.TSCD.filter((v: any) => {
        return v.Tieude.includes(filterValue.trim().toLowerCase())
      })
    }
    else this.FilterTSCD = this.TSCD
  }
  FilterOverlay2(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 1) {
      this.FilterHangmuc = this.Hangmuc.filter((v: any) => {
        return v.Title.trim().toLowerCase().includes(filterValue.trim().toLowerCase())
      })
    }
    else this.FilterHangmuc = this.Hangmuc
  }
  FilterOverlay3(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 1) {
      this.FilterTrangthai = this.Trangthai.filter((v: any) => {
        return v.Title.trim().toLowerCase().includes(filterValue.trim().toLowerCase())
      })
    }
    else this.FilterTrangthai = this.Trangthai
  }
  ChooseOverlay1(item: any, index: any) {
    this.Detail.TenTSCD = item.Tieude
    this._Mau1Service.UpdateMau1(this.DataMau[index])
  }
  AutoUpdate(index: any)
  {
    this._Mau1Service.UpdateMau1(this.DataMau[index])
  }
  ChooseOverlay2(item: any, index: any,index1: any) {
    this.DataMau[index].Chitiet[index1].Hangmuc = item.Title
    this._Mau1Service.UpdateMau1(this.DataMau[index])
  }
  ChooseOverlay3(item: any, index: any,index1: any) {
    this.DataMau[index].Chitiet[index1].Tinhtrang = item.Title
    this._Mau1Service.UpdateMau1(this.DataMau[index])
  }
  ChooseOverlay4(item: any, index: any,index1: any) {
    this.DataMau[index].Chitiet[index1].Ngaykiemtra = item
    this._Mau1Service.UpdateMau1(this.DataMau[index])
  }
  ChooseOverlay5(item: any, index: any,index1: any) {
    this.DataMau[index].Chitiet[index1].Ngaykiemtra = item.Title
    this._Mau1Service.UpdateMau1(this.DataMau[index])
  }






  AddHangmuc(item: any) {
    this._HangmucService.CreateHangmuc({ Title: item }).then(() => {
    })
  }
  AddTrangthai(data: any) {
    console.log(data);
    this.Trangthai.push({ id: this.Trangthai.length + 1, Title: data })
    const item = { id: this.idTrangthai, Data: this.Trangthai }
    this._CauhinhService.UpdateCauhinh(item).then(() => { })
  }
}
