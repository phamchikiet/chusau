import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../auth/users.service';
import { LichsuService } from './lichsu.service';
import { ThietbiService } from '../thietbi/thietbi.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lichsu',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    CommonModule,
    MatTooltipModule,
    MatButtonModule
  ],
  templateUrl: './lichsu.component.html',
  styleUrl: './lichsu.component.scss'
})
export class LichsuComponent {
  ListData: any[] = []
  FilterListData: any[] = []
  displayedColumns: string[] = ['Hoten', 'SDT', 'Tieude','Code', 'Trangthai', 'Ngaytao','NgayCapnhat',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _ThietbiService: ThietbiService,
    private _LichsuService: LichsuService,
    private _UsersService: UsersService,
  ) { }

  ngOnInit() {
    this._UsersService.getUsers().subscribe((users) => {
      this._ThietbiService.getAllThietbi().then(thietbi => {
        this._LichsuService.getAll().then(lichsu => {
          lichsu.forEach((v: any) => {
            v.Thietbi = thietbi.find((v1: any) => v1.id == v.idTB) ? thietbi.find((v1: any) => v1.id == v.idTB) : { Tieude: '' }
            v.User = users.find(v2 => v2.id == v.idUser)
          })
          this.FilterListData = this.ListData = lichsu
         // console.log(lichsu);
          this.dataSource = new MatTableDataSource(lichsu);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      })
    })
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.FilterListData = this.ListData.filter((v) => v.User.Hoten.toLowerCase().includes(value) || v.Thietbi.Tieude.toLowerCase().includes(value))
    }
    else {
      this.FilterListData = this.ListData
    }
  }
  openDialog(teamplate: TemplateRef<any>): void {
    // const dialogRef = this.dialog.open(teamplate, {
    // });
  }
  writeExcelFile(data: any) {
    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    // const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    // this.saveAsExcelFile(blob, 'data');
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    // const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    // const url: string = window.URL.createObjectURL(data);
    // const link: HTMLAnchorElement = document.createElement('a');
    // link.href = url;
    // link.download = `${fileName}.xlsx`;
    // link.click();
    // window.URL.revokeObjectURL(url);
    // link.remove();
  }

  async LoadDrive() {
    // const data = await this._ThietbiService.getDrive()
    // this.SanphamsDrive = data.values.slice(1).map((row: any) => {
    //   return {
    //     Tieude: row[1],
    //     Mota: row[4],
    //   };
    // });
    // console.log(this.SanphamsDrive);
  }
  SyncDrive() {
    // this.SanphamsDrive.forEach((v:any)=>
    // {
    //   this._ThietbiService.CreateThietbi(v)
    // })

  }
}
