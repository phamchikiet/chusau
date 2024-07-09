import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Mau2Service } from './mau2.service';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-mau2',
  standalone:true,
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
    MatTooltipModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './mau2.component.html',
  styleUrls: ['./mau2.component.css']
})

export class Mau2Component implements OnInit {
  @Input() idBaocao: any=''
  displayedColumns: string[] = [
    'STT','TenTSCD', 'Hangmuc', 'Tinhtrang','Ngaythuchien','Noidungthuchien','Saukhithuchien','Ghichu'
  ];
  Baocao:any= [];
  DataMau:any[]=[]
//   DataMau:any=[
//     {
//         "TenTSCD": "Máy Vi tính E7300-2.66ghz+LCD 15.6\"LG",
//         "Hangmuc": "Màn Hình",
//         "Tinhtrang": "Đang HĐ/ Hư Hỏng",
//         "Ngaykiemtra": "02/01/2024",
//         "Ghichu":""
//     }
// ]

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
  TSCD:any[]=[]
  FilterTSCD:any[]=[]

  Hangmuc:any[]=[]
  FilterHangmuc:any[]=[]

  Trangthai:any[]=[]
  FilterTrangthai:any[]=[]

  _ThietbiService:ThietbiService= inject(ThietbiService)
  _HangmucService:HangmucService= inject(HangmucService)
  _CauhinhService:CauhinhService= inject(CauhinhService)
  _Mau2Service:Mau2Service= inject(Mau2Service)
  input2:any=''
  input3:any=''
  Overlay1:any = {}
  Overlay2:any = {}
  Overlay3:any = {}
  Overlay4:any = {}
  Overlay5:any = {}
  idTrangthai:any =''
  triggerOrigin: any;
  toggle1(trigger: any,index:any) {
    this.triggerOrigin = trigger;
    this.Overlay1[index] = true
  }
  toggle2(trigger: any,index:any) {
    this.triggerOrigin = trigger;
    this.Overlay2[index] = true
  }
  toggle3(trigger: any,index:any) {
    this.triggerOrigin = trigger;
    this.Overlay3[index] = true
  }
  toggle4(trigger: any,index:any) {
    this.triggerOrigin = trigger;
    this.Overlay4[index] = true
  }
  toggle5(trigger: any,index:any) {
    this.triggerOrigin = trigger;
    this.Overlay5[index] = true
  }
  async Addrow()
  {
    const item = {
      TenTSCD: "",
      Hangmuc: "",
      Tinhtrang: "",
      Ngaykiemtra: new Date(),
      idBaocao:this.idBaocao
     }
      this._Mau2Service.CreateMau2(item).then(async ()=>
      {
        this.DataMau = await this._Mau2Service.getMau2ByidBaocao(this.idBaocao)
        this.dataSource = new MatTableDataSource(this.DataMau);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }
  constructor() { }
  async ngOnInit() {
    //  const Thietbis = await this._ThietbiService.SearchThietbi({
    //   pageSize:10,
    //   pageNumber:0,
    //   isDelete:false
    // })
    console.log(this.idBaocao);

    this.TSCD = this.FilterTSCD = await this._ThietbiService.getAllThietbi()
    this.Hangmuc = this.FilterHangmuc = await this._HangmucService.getAllHangmuc()
    this.DataMau = await this._Mau2Service.getMau2ByidBaocao(this.idBaocao)
    const Trangthai = await this._CauhinhService.getCauhinhBySlug('trangthai')
    this.idTrangthai = Trangthai?.id
    this.Trangthai = this.FilterTrangthai = Trangthai?.Data
    // Thietbis.item.forEach((v:any)=>{
    //   v.TenTSCD = v.Tieude
    //   v.MasoTSCD = v.Code
    //   v.NamSD = ''
    //   v.TheoSoSL = ''
    //   v.TheoSoConlai = ''
    //   v.KiemkeSL = ''
    //   v.KiemkeNguyengia = ''
    //   v.KiemkeConlai = ''
    //   v.ChenhlechNguyengia = ''
    //   v.ChenhlechConlai = ''
    //   v.Ghichu = ''
    //   v.MaCode = ''
    //   this.Baocao.push(v)
    // })
    console.log(this.Baocao);
    this.dataSource = new MatTableDataSource(this.DataMau);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
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


  DeleteItem(item:any)
  {
    this._Mau2Service.DeleteMau2(item).then(()=>this.ngOnInit())
  }

  FilterOverlay1(event:any)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue.length>1)
      {
        this.FilterTSCD = this.TSCD.filter((v:any)=>{
          return v.Tieude.includes(filterValue.trim().toLowerCase())
        })
      }
    else this.FilterTSCD = this.TSCD
  }
  FilterOverlay2(event:any)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue.length>1)
      {
        this.FilterHangmuc = this.Hangmuc.filter((v:any)=>{
          return v.Title.trim().toLowerCase().includes(filterValue.trim().toLowerCase())
        })
      }
    else this.FilterHangmuc = this.Hangmuc
  }
  FilterOverlay3(event:any)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue.length>1)
      {
        this.FilterTrangthai = this.Trangthai.filter((v:any)=>{
          return v.Title.trim().toLowerCase().includes(filterValue.trim().toLowerCase())
        })
      }
    else this.FilterTrangthai = this.Trangthai
  }
  ChooseOverlay1(item:any,index:any)
  {
    this.DataMau[index].TenTSCD = item.Tieude
    this._Mau2Service.UpdateMau2(this.DataMau[index])
    this.dataSource = new MatTableDataSource(this.DataMau);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ChooseOverlay2(item:any,index:any)
  {
    this.DataMau[index].Hangmuc = item.Title
    this._Mau2Service.UpdateMau2(this.DataMau[index])
    this.dataSource = new MatTableDataSource(this.DataMau);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ChooseOverlay3(item:any,index:any)
  {
    console.log();

    this.DataMau[index].Tinhtrang = item.Title
    this._Mau2Service.UpdateMau2(this.DataMau[index])
    this.dataSource = new MatTableDataSource(this.DataMau);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ChooseOverlay4(item:any,index:any)
  {
    console.log(item);
    this.DataMau[index].Ngaykiemtra = item
    this._Mau2Service.UpdateMau2(this.DataMau[index])
    this.dataSource = new MatTableDataSource(this.DataMau);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ChooseOverlay5(item:any,index:any)
  {
    console.log(item);
    this.DataMau[index].Ghichu = item
    this._Mau2Service.UpdateMau2(this.DataMau[index])
    this.dataSource = new MatTableDataSource(this.DataMau);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  AddHangmuc(item:any)
  {
    this._HangmucService.CreateHangmuc({Title:item}).then(()=>
    {
    })
  }
  AddTrangthai(data:any)
  {
    console.log(data);
    this.Trangthai.push({id:this.Trangthai.length+1,Title:data})
    const item ={id:this.idTrangthai,Data:this.Trangthai}
    this._CauhinhService.UpdateCauhinh(item).then(()=>{})
  }
  writeExcelFile() {

  let exData:any= []
  let Header= [
    { A: "TRƯỜNG CAO ĐẲNG NGHỀ", B: "", C: "" ,D:"",E:"",F:"",G:"",H:"",I:"",J:"CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",K:"",L:"",M:"",N:""},
    { A: "THÀNH PHỐ HỒ CHÍ MINH", B: "", C: "",D:"",E:"",F:"",G:"",H:"",I:"",J:"Độc lập - Tự do - Hạnh phúc",K:"",L:"",M:"",N:""},
    { A: "KHOA: ĐIỆN - ĐIỆN LẠNH", B: "", C: "",D:"",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:"",N:""},
    { A: "Số: / M1/KĐ.ĐL", B: "", C: "",D:"",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:"",N:"Mẫu 1"},
    { A: "", B: "TỔNG HỢP THIẾT BỊ KHOA ĐIỆN - ĐIỆN LẠNH", C: "",D:"",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:"",N:""},
    { A: "STT", B: "Tên TSCĐ", C: "Mã số TSCĐ",D:"Năm sử dụng",E:"Theo sổ kế toán",F:"",G:"Theo kiểm kê",H:"",I:"",J:"Chênh lệch",K:"",L:"",M:"Ghi chú",N:"Mã code"},
    { A: "", B: "", C: "",D:"SL",E:"Giá trị còn lại",F:"SL",G:"Nguyên giá",H:"Giá trị còn lại",I:"SL",J:"Nguyên giá",K:"Giá trị còn lại",L:"",M:"",N:""},
  ]
  let Footer= [
    { A: "", B: "Trưởng ban kiểm kê", C: "" ,D:"",E:"Trưởng phòng TC-KT	",F:"",G:"",H:"Trưởng phòng QTTB",I:"",J:"",K:"",L:"Trưởng khoa Điện - Điện Lạnh",M:"",N:""},
    { A: "", B: "", C: "" ,D:"",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:"",N:""},
    { A: "", B: "", C: "" ,D:"",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:"",N:""},
    { A: "", B: "Trần Kim Tuyền", C: "" ,D:"",E:"Lưu Thị Hương",F:"",G:"",H:"Phạm Mạnh Dũng",I:"",J:"",K:"",L:"Phạm Văn Trọng	",M:"",N:""}
  ]
  let Main:any = []
  this.DataMau.forEach((v:any)=>
    {
     const item =
     {
      A: v.STT,
      B: v.TenTSCD,
      c: v.Hangmuc,
      C: v.Tinhtrang ,
      D: v.Ngaykiemtra,
      E: v.Ghichu
      }
      Main.push(item)
    })

    exData = [...Header,...Main,...Footer]
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
    this.saveAsExcelFile(excelBuffer, 'Mau2_'+moment().format("DD_MM_YYYY"));

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
