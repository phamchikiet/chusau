import { Component, HostListener, Input, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ThietbiService } from '../../thietbi/thietbi.service';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Mau3Service } from './mau3.service';
import { Subject, Observable, withLatestFrom, map, filter, takeUntil, timer } from 'rxjs';
import { BaocaoService } from '../baocao.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mau3',
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
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './mau3.component.html',
  styleUrls: ['./mau3.component.css']
})

export class Mau3Component implements OnInit {
  @Input() Baocao: any
  displayedColumns: string[] = ['STT', 'Hangmuc', 'Tinhtrang','Ngaythuchien','Chiphivattu','Chiphinhancong','Soluong','Thanhtien','Ghichu'];
  DataMau:any[]=[]
  Chitiet:any[]=[]
  dataSource: any[]=[];
  // dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  TSCD:any[]=[]
  FilterTSCD:any[]=[]
  Hangmuc:any[]=[]
  FilterHangmuc:any[]=[]
  Trangthai:any[]=[]
  FilterTrangthai:any[]=[]
  _ThietbiService:ThietbiService= inject(ThietbiService)
  _HangmucService:HangmucService= inject(HangmucService)
  _CauhinhService:CauhinhService= inject(CauhinhService)
  _Mau3Service:Mau3Service= inject(Mau3Service)
  _BaocaoService:BaocaoService= inject(BaocaoService)
  SelectItem:any
  input2:any=''
  input3:any=''
  Overlay1:any = {}
  Overlay2:any= []
  Overlay3:any = []
  Overlay4:any = []
  Overlay5:any = []
  Overlay6:any = []
  Overlay7:any = []
  Overlay8:any = []
  idTrangthai:any =''
  triggerOrigin: any;
  toggle1(trigger: any,index:any) {
    this.triggerOrigin = trigger;
    this.Overlay1[index] = true
  }
  toggle2(trigger: any,index:any,index1:any) {
   this.triggerOrigin = trigger;
    const item = this.Overlay2.find((v:any)=>{
      return v.index == index && v.index1==index1
    })
    if(item){
      const findIndex = this.Overlay2.findIndex((v:any)=>{
        return v.index == index && v.index1==index1
      })
      this.Overlay2[findIndex].value = true
    }
    else {
      this.Overlay2.push({index:index,index1:index1,value:true})
    }
    console.log(this.Overlay2);
  }
  backdrop2(index:any,index1:any) {
     const item = this.Overlay2.find((v:any)=>{
       return v.index == index && v.index1==index1
     })
     console.log(item);

     if(item){
       const findIndex = this.Overlay2.findIndex((v:any)=>{
         return v.index == index && v.index1==index1
       })
       this.Overlay2[findIndex].value = false
     }
     else {
       this.Overlay2.push({index:index,index1:index1,value:false})
     }
   }
  backdrop3(index:any,index1:any) {
     const item = this.Overlay3.find((v:any)=>{
       return v.index == index && v.index1==index1
     })
     console.log(item);

     if(item){
       const findIndex = this.Overlay3.findIndex((v:any)=>{
         return v.index == index && v.index1==index1
       })
       this.Overlay3[findIndex].value = false
     }
     else {
       this.Overlay3.push({index:index,index1:index1,value:false})
     }
   }
   backdrop4(index:any,index1:any) {
    const item = this.Overlay4.find((v:any)=>{
      return v.index == index && v.index1==index1
    })
    console.log(item);

    if(item){
      const findIndex = this.Overlay4.findIndex((v:any)=>{
        return v.index == index && v.index1==index1
      })
      this.Overlay4[findIndex].value = false
    }
    else {
      this.Overlay4.push({index:index,index1:index1,value:false})
    }
  }
  backdrop5(index:any,index1:any) {
    const item = this.Overlay5.find((v:any)=>{
      return v.index == index && v.index1==index1
    })
    console.log(item);

    if(item){
      const findIndex = this.Overlay5.findIndex((v:any)=>{
        return v.index == index && v.index1==index1
      })
      this.Overlay5[findIndex].value = false
    }
    else {
      this.Overlay5.push({index:index,index1:index1,value:false})
    }
  }
  backdrop6(index:any,index1:any) {
    const item = this.Overlay6.find((v:any)=>{
      return v.index == index && v.index1==index1
    })
    console.log(item);

    if(item){
      const findIndex = this.Overlay6.findIndex((v:any)=>{
        return v.index == index && v.index1==index1
      })
      this.Overlay6[findIndex].value = false
    }
    else {
      this.Overlay6.push({index:index,index1:index1,value:false})
    }
  }
  backdrop7(index:any,index1:any) {
    const item = this.Overlay7.find((v:any)=>{
      return v.index == index && v.index1==index1
    })
    console.log(item);

    if(item){
      const findIndex = this.Overlay7.findIndex((v:any)=>{
        return v.index == index && v.index1==index1
      })
      this.Overlay7[findIndex].value = false
    }
    else {
      this.Overlay7.push({index:index,index1:index1,value:false})
    }
  }
  backdrop8(index:any,index1:any) {
    const item = this.Overlay8.find((v:any)=>{
      return v.index == index && v.index1==index1
    })
    console.log(item);

    if(item){
      const findIndex = this.Overlay8.findIndex((v:any)=>{
        return v.index == index && v.index1==index1
      })
      this.Overlay8[findIndex].value = false
    }
    else {
      this.Overlay8.push({index:index,index1:index1,value:false})
    }
  }


  toggle3(trigger: any,index:any,index1:any) {
    this.triggerOrigin = trigger;
     const item = this.Overlay3.find((v:any)=>{
       return v.index == index && v.index1==index1
     })
     if(item){
       const findIndex = this.Overlay3.findIndex((v:any)=>{
         return v.index == index && v.index1==index1
       })
       this.Overlay3[findIndex].value = true
     }
     else {
       this.Overlay3.push({index:index,index1:index1,value:true})
     }
     console.log(this.Overlay3);
   }

toggle4(trigger: any,index:any,index1:any) {
  this.triggerOrigin = trigger;
   const item = this.Overlay4.find((v:any)=>{
     return v.index == index && v.index1==index1
   })
   if(item){
     const findIndex = this.Overlay4.findIndex((v:any)=>{
       return v.index == index && v.index1==index1
     })
     this.Overlay4[findIndex].value = true
   }
   else {
     this.Overlay4.push({index:index,index1:index1,value:true})
   }
   console.log(this.Overlay4);
 }
 toggle5(trigger: any,index:any,index1:any) {
  this.triggerOrigin = trigger;
   const item = this.Overlay5.find((v:any)=>{
     return v.index == index && v.index1==index1
   })
   if(item){
     const findIndex = this.Overlay5.findIndex((v:any)=>{
       return v.index == index && v.index1==index1
     })
     this.Overlay5[findIndex].value = true
   }
   else {
     this.Overlay5.push({index:index,index1:index1,value:true})
   }
   console.log(this.Overlay5);
 }
 toggle6(trigger: any,index:any,index1:any) {
  this.triggerOrigin = trigger;
   const item = this.Overlay6.find((v:any)=>{
     return v.index == index && v.index1==index1
   })
   if(item){
     const findIndex = this.Overlay6.findIndex((v:any)=>{
       return v.index == index && v.index1==index1
     })
     this.Overlay6[findIndex].value = true
   }
   else {
     this.Overlay6.push({index:index,index1:index1,value:true})
   }
   console.log(this.Overlay6);
 }
 toggle7(trigger: any,index:any,index1:any) {
  this.triggerOrigin = trigger;
   const item = this.Overlay7.find((v:any)=>{
     return v.index == index && v.index1==index1
   })
   if(item){
     const findIndex = this.Overlay7.findIndex((v:any)=>{
       return v.index == index && v.index1==index1
     })
     this.Overlay7[findIndex].value = true
   }
   else {
     this.Overlay7.push({index:index,index1:index1,value:true})
   }
   console.log(this.Overlay7);
 }
 toggle8(trigger: any,index:any,index1:any) {
  this.triggerOrigin = trigger;
   const item = this.Overlay8.find((v:any)=>{
     return v.index == index && v.index1==index1
   })
   if(item){
     const findIndex = this.Overlay8.findIndex((v:any)=>{
       return v.index == index && v.index1==index1
     })
     this.Overlay8[findIndex].value = true
   }
   else {
     this.Overlay8.push({index:index,index1:index1,value:true})
   }
   console.log(this.Overlay8);
 }
  GetOverlay(List:any,index:any,index1:any){
    const item =  List.find((v:any)=>{
      return v.index == index && v.index1==index1
    })
    if(item){
      return item.value
    }
    else {
      return false
    }
  }
  async Addrow()
  {
    console.log(this.Baocao);

    const item = {
      TenTSCD: "",
      Hangmuc: "",
      Tinhtrang: "",
      idBaocao:this.Baocao.id
     }
     await this._Mau3Service.CreateMau3(item).then(()=>{this.ngOnInit()})

  }
  constructor(
    private dialog: MatDialog,
    private _NotifierService: NotifierService
  ) { }
  async ngOnInit() {
    this.TSCD = this.FilterTSCD = await this._ThietbiService.getAllThietbi()
    this.Hangmuc = this.FilterHangmuc = await this._HangmucService.getAllHangmuc()
    this.DataMau = await this._Mau3Service.getMau3ByidBaocao(this.Baocao.id)
    this.Chitiet =  this.DataMau.flatMap(item => item.Chitiet);
    const Trangthai = await this._CauhinhService.getCauhinhBySlug('trangthai')
    this.idTrangthai = Trangthai?.id
    this.Trangthai = this.FilterTrangthai = Trangthai?.Data
    this.LoadDataSource()
  }
  LoadDataSource()
  {
    this.DataMau.forEach((v,k) => {
      this.dataSource[k] = new MatTableDataSource(v.Chitiet);
      this.dataSource[k].paginator = this.paginator;
      this.dataSource[k].sort = this.sort;
    });
  }


  DeleteItem(item:any,index:any)
  {
    item.Chitiet = item.Chitiet.slice(0, index).concat(item.Chitiet.slice(index+1))
    this._Mau3Service.UpdateMau3(item).then(()=>this.ngOnInit())
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
  ChooseOverlay1(item:any,index:any,index1:any)
  {
    this.DataMau[index].TenTSCD = item.Tieude
    this._Mau3Service.UpdateMau3(this.DataMau[index])
    this.LoadDataSource()
  }
  ChooseOverlay2(item:any,index:any,index1:any)
  {
    this.DataMau[index].Chitiet[index1].Hangmuc = item.Title
    this._Mau3Service.UpdateMau3(this.DataMau[index])
    this.LoadDataSource()
  }
  ChooseOverlay3(item:any,index:any,index1:any)
  {
    this.DataMau[index].Chitiet[index1].Tinhtrang = item.Title
    this._Mau3Service.UpdateMau3(this.DataMau[index])
    this.LoadDataSource()
  }
  ChooseOverlay4(item:any,index:any,index1:any)
  {
    this.DataMau[index].Chitiet[index1].Ngaythuchien = item
    this._Mau3Service.UpdateMau3(this.DataMau[index])
    this.LoadDataSource()
  }
  ChooseOverlay5(item:any,index:any,index1:any)
  {
    console.log(item);
    this.DataMau[index].Chitiet[index1].Ghichu = item
    this._Mau3Service.UpdateMau3(this.DataMau[index])
    this.LoadDataSource()
  }
  AddChitiet(index:any) {
    console.log(index);
    this.DataMau[index].Chitiet.unshift({ Hangmuc: '', Tinhtrang: '', Ngaykiemtra: '', Ghichu: '' })
   // this.Chitiet =  this.DataMau.flatMap(item => item.Chitiet);
    this.LoadDataSource()
  }
  AddHangmuc(item:any)
  {
    this._HangmucService.CreateHangmuc({Title:item}).then(()=>
    {
    })
  }
  UpdateChiphi(idx:any,i:any)
  {
    this.DataMau[idx].Chitiet[i].Thanhtien = (this.DataMau[idx].Chitiet[i].Chiphivattu + this.DataMau[idx].Chitiet[i].Chiphinhancong)*this.DataMau[idx].Chitiet[i].Soluong||1
    this._Mau3Service.UpdateMau3(this.DataMau[idx]).then(() =>
      {
       // this._NotifierService.notify("success","Cập Nhật Thành Công")
      })
  }
  AddTrangthai(data:any)
  {
    console.log(data);
    this.Trangthai.push({id:this.Trangthai.length+1,Title:data})
    const item ={id:this.idTrangthai,Data:this.Trangthai}
    this._CauhinhService.UpdateCauhinh(item).then(()=>{})
  }
  openPrintDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result:any) => {

    });
  }

  XoaDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        console.log(this.SelectItem);
        this._Mau3Service.DeleteMau3(this.SelectItem).then(() =>{
          this._NotifierService.notify("success","Xoá Thành Công")
          this.ngOnInit()
        })
      }
    });
  }
  router: Router = inject(Router);
  DeleteBaocao(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        console.log(this.Baocao);
        this._BaocaoService.DeleteBaocao(this.Baocao)
        this.DataMau.forEach((v)=>{
          this._Mau3Service.DeleteMau3(v)
        })
        setTimeout(() => {
          this.router.navigate(['/baocao']);
        }, 300);
      }
    });
  }

}
