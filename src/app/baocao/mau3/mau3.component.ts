import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ThietbiService } from '../../thietbi/thietbi.service';
import * as XLSX from 'xlsx';
import moment from 'moment';
@Component({
  selector: 'app-mau3',
  standalone:true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule
  ],
  templateUrl: './mau3.component.html',
  styleUrls: ['./mau3.component.css']
})

export class Mau3Component implements OnInit {
  displayedColumns: string[] = [
    'STT','TenTSCD', 'Hangmuc', 'Noidungthuchien', 'Ngaythuchien','Chiphivattu','Chiphinhancong','Soluong','Thanhtien','Ghichu'
  ];
  Baocao:any= [];
  DataMau:any=[
    {
        "TenTSCD": "Máy Vi tính E7300-2.66ghz+LCD 15.6\"LG",
        "Hangmuc": "Màn Hình",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "02/01/2024"
    },
    {
        "TenTSCD": "Máy Vi tính E7300-2.66ghz+LCD 15.6\"LG",
        "Hangmuc": "Con Chuột",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "02/01/2024"
    },
    {
        "TenTSCD": "Máy Vi tính E7300-2.66ghz+LCD 15.6\"LG",
        "Hangmuc": "Bàn Phím",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "02/01/2024"
    },
    {
        "TenTSCD": "Máy Vi tính E7300-2.66ghz+LCD 15.6\"LG",
        "Hangmuc": "Phần cứng",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "02/01/2024"
    },
    {
        "TenTSCD": "Máy Vi tính E7300-2.66ghz+LCD 15.6\"LG",
        "Hangmuc": "CPU",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "02/01/2024"
    },
    {
        "TenTSCD": "Máy lạnh PANASONIC CWC 182KF 2.0HP -1K",
        "Hangmuc": "Vỏ Thiết Bị",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "03/01/2024"
    },
    {
        "TenTSCD": "Máy lạnh PANASONIC CWC 182KF 2.0HP -1K",
        "Hangmuc": "Cục Lạnh",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "03/01/2024"
    },
    {
        "TenTSCD": "Máy lạnh PANASONIC CWC 182KF 2.0HP -1K",
        "Hangmuc": "Cục Nóng",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "03/01/2024"
    },
    {
        "TenTSCD": "Máy lạnh PANASONIC CWC 182KF 2.0HP -1K",
        "Hangmuc": "Động cơ",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "03/01/2024"
    },
    {
        "TenTSCD": "Máy đo rò rỉ môi chất lạnh",
        "Hangmuc": "Thiết bị",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "04/01/2024"
    },
    {
        "TenTSCD": "Máy đo rò rỉ môi chất lạnh",
        "Hangmuc": "Pin thiết bị",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "04/01/2024"
    },
    {
        "TenTSCD": "Máy đo rò rỉ môi chất lạnh",
        "Hangmuc": "Bộ nguồn thiết bị",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "04/01/2024"
    },
    {
        "TenTSCD": "Máy đo rò rỉ môi chất lạnh",
        "Hangmuc": "Phụ kiện thiết bị",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "04/01/2024"
    },
    {
        "TenTSCD": "Máy đo rò rỉ môi chất lạnh",
        "Hangmuc": "Dây đo thiết bị",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "04/01/2024"
    },
    {
        "TenTSCD": "Máy đo rò rỉ môi chất lạnh",
        "Hangmuc": "Hóa Chất/ Gas",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "04/01/2024"
    },
    {
        "TenTSCD": "Mô hình máy lạnh 10 HP",
        "Hangmuc": "Vỏ Thiết Bị",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "04/01/2024"
    },
    {
        "TenTSCD": "Mô hình máy lạnh 10 HP",
        "Hangmuc": "Cục Lạnh",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "04/01/2024"
    },
    {
        "TenTSCD": "Mô hình máy lạnh 10 HP",
        "Hangmuc": "Cục Nóng",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "04/01/2024"
    },
    {
        "TenTSCD": "Mô hình máy lạnh 10 HP",
        "Hangmuc": "Hóa Chất/ Gas",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "04/01/2024"
    },
    {
        "TenTSCD": "Mô hình máy lạnh 10 HP",
        "Hangmuc": "Phụ kiện thiết bị",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "04/01/2024"
    },
    {
        "TenTSCD": "Mô hình máy lạnh 10 HP",
        "Hangmuc": "Dây đo thiết bị",
        "Tinhtrang": "Đang HĐ/ Hư Hỏng",
        "Ngaykiemtra": "04/01/2024"
    }
]
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
  _ThietbiService:ThietbiService= inject(ThietbiService)
  constructor() { }

  async ngOnInit() {
    const Thietbis = await this._ThietbiService.SearchThietbi({
      pageSize:10,
      pageNumber:0,
      isDelete:false
    })
    console.log(Thietbis);
    Thietbis.item.forEach((v:any)=>{
      v.TenTSCD = v.Tieude
      v.MasoTSCD = v.Code
      v.NamSD = ''
      v.TheoSoSL = ''
      v.TheoSoConlai = ''
      v.KiemkeSL = ''
      v.KiemkeNguyengia = ''
      v.KiemkeConlai = ''
      v.ChenhlechNguyengia = ''
      v.ChenhlechConlai = ''
      v.Ghichu = ''
      v.MaCode = ''
      this.Baocao.push(v)
    })
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

  writeExcelFile() {
    let Giagoc:any=[]
    let item:any={}
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
    this.saveAsExcelFile(excelBuffer, 'Mau3_'+moment().format("DD_MM_YYYY"));

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
