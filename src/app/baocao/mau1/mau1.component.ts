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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './mau1.component.html',
  styleUrls: ['./mau1.component.css']
})

export class Mau1Component implements OnInit {
  @Input() Baocao: any
  displayedColumns: string[] = [
    'STT', 'TenTSCD', 'Hangmuc', 'Tinhtrang', 'Ngaykiemtra', 'Ghichu'
  ];
  DataMau: any[] = []
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
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
  Overlay1: any = {}
  Overlay2: any = {}
  Overlay3: any = {}
  Overlay4: any = {}
  Overlay5: any = {}
  idTrangthai: any = ''
  triggerOrigin: any;
  toggle1(trigger: any,index: any) {
    this.triggerOrigin = trigger;
    this.Overlay1[index] = true
  }
  toggle2(trigger: any, index: any) {
    this.triggerOrigin = trigger;
    this.Overlay2[index] = true
  }
  toggle3(trigger: any, index: any) {
    this.triggerOrigin = trigger;
    this.Overlay3[index] = true
  }
  toggle4(trigger: any, index: any) {
    this.triggerOrigin = trigger;
    this.Overlay4[index] = true
  }
  toggle5(trigger: any, index: any) {
    this.triggerOrigin = trigger;
    this.Overlay5[index] = true
  }
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
  logselect(a:any,b:any)
  {
    console.log(a,b);

  }
  // async Addrow() {
  //   const item = {
  //     TenTSCD: "",
  //     Hangmuc: "",
  //     Tinhtrang: "",
  //     Ngaykiemtra: new Date(),
  //     idBaocao: this.Baocao.id
  //   }
  //   this._Mau1Service.CreateMau1(item).then(async () => {
  //     this.DataMau = await this._Mau1Service.getMau1ByidBaocao(this.Baocao.id)
  //     this.dataSource = new MatTableDataSource(this.DataMau);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   })

  // }
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
    console.log('Baocao',this.Baocao);
    console.log('DataMau',this.DataMau);
    this.dataSource = new MatTableDataSource(this.DataMau);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Diachi': return item.Giohangs.Khachhang.Diachi;
        case 'Hoten': return item.Giohangs.Khachhang.Hoten;
        case 'SDT': return item.Giohangs.Khachhang.SDT;
        case 'Hinhthuc': return item.Thanhtoan.Hinhthuc;
        default: return item[property];
      }
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  openPrintDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {

    });
  }
  AddChitiet(index:any) {
    this.DataMau[index].Chitiet.unshift({ Hangmuc: '', Tinhtrang: '', Ngaykiemtra: '', Ghichu: '' })
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
  writeExcelFile() {

    let exData: any = []
    let Header = [
      { A: "TRƯỜNG CAO ĐẲNG NGHỀ", B: "", C: "", D: "", E: "", F: "", G: "", H: "", I: "", J: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", K: "", L: "", M: "", N: "" },
      { A: "THÀNH PHỐ HỒ CHÍ MINH", B: "", C: "", D: "", E: "", F: "", G: "", H: "", I: "", J: "Độc lập - Tự do - Hạnh phúc", K: "", L: "", M: "", N: "" },
      { A: "KHOA: ĐIỆN - ĐIỆN LẠNH", B: "", C: "", D: "", E: "", F: "", G: "", H: "", I: "", J: "", K: "", L: "", M: "", N: "" },
      { A: "Số: / M1/KĐ.ĐL", B: "", C: "", D: "", E: "", F: "", G: "", H: "", I: "", J: "", K: "", L: "", M: "", N: "Mẫu 1" },
      { A: "", B: "TỔNG HỢP THIẾT BỊ KHOA ĐIỆN - ĐIỆN LẠNH", C: "", D: "", E: "", F: "", G: "", H: "", I: "", J: "", K: "", L: "", M: "", N: "" },
      { A: "STT", B: "Tên TSCĐ", C: "Mã số TSCĐ", D: "Năm sử dụng", E: "Theo sổ kế toán", F: "", G: "Theo kiểm kê", H: "", I: "", J: "Chênh lệch", K: "", L: "", M: "Ghi chú", N: "Mã code" },
      { A: "", B: "", C: "", D: "SL", E: "Giá trị còn lại", F: "SL", G: "Nguyên giá", H: "Giá trị còn lại", I: "SL", J: "Nguyên giá", K: "Giá trị còn lại", L: "", M: "", N: "" },
    ]
    let Footer = [
      { A: "", B: "Trưởng ban kiểm kê", C: "", D: "", E: "Trưởng phòng TC-KT	", F: "", G: "", H: "Trưởng phòng QTTB", I: "", J: "", K: "", L: "Trưởng khoa Điện - Điện Lạnh", M: "", N: "" },
      { A: "", B: "", C: "", D: "", E: "", F: "", G: "", H: "", I: "", J: "", K: "", L: "", M: "", N: "" },
      { A: "", B: "", C: "", D: "", E: "", F: "", G: "", H: "", I: "", J: "", K: "", L: "", M: "", N: "" },
      { A: "", B: "Trần Kim Tuyền", C: "", D: "", E: "Lưu Thị Hương", F: "", G: "", H: "Phạm Mạnh Dũng", I: "", J: "", K: "", L: "Phạm Văn Trọng	", M: "", N: "" }
    ]
    let Main: any = []
    this.DataMau.forEach((v: any) => {
      const item =
      {
        A: v.STT,
        B: v.TenTSCD,
        c: v.Hangmuc,
        C: v.Tinhtrang,
        D: v.Ngaykiemtra,
        E: v.Ghichu
      }
      Main.push(item)
    })

    exData = [...Header, ...Main, ...Footer]
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exData);
    worksheet["!merges"] = [
      { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },
      { s: { r: 1, c: 9 }, e: { r: 1, c: 13 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } },
      { s: { r: 2, c: 9 }, e: { r: 2, c: 13 } },
      { s: { r: 3, c: 0 }, e: { r: 3, c: 1 } },
      { s: { r: 3, c: 9 }, e: { r: 3, c: 13 } },
      { s: { r: 3, c: 9 }, e: { r: 3, c: 13 } },
      { s: { r: 4, c: 1 }, e: { r: 4, c: 12 } },
    ]; // Merge first row

    // 3. Add Styling (Bold, Centered, Font Size)
    const headerStyle = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: "center" },
    };
    worksheet["A1"].s = headerStyle;
    XLSX.utils.book_append_sheet(workbook, worksheet, "FormattedSheet");
    // 4. Generate Excel File (xlsx)
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });


    // const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    // const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Giagoc);
    // XLSX.utils.book_append_sheet(workbook, worksheet1, 'DonhangAdmin');
    // XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Mau1_' + moment().format("DD_MM_YYYY"));

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
}
