import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LichsuService {
  private _lichsu: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _lichsus: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  constructor() { }
  get lichsus$(): Observable<any[]> {
    return this._lichsus.asObservable();
  }
  get lichsu$(): Observable<any> {
    return this._lichsu.asObservable();
  }
  get totalCount$(): Observable<any | null> {
    return this._totalCount.asObservable();
  }
  async SearchThietbi(SearchParams: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
      const response = await fetch(`${environment.APIURL}/test_lichsu/search`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._lichsus.next(data.items)
      this._totalCount.next(data.totalCount)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async CreateThietbi(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/test_lichsu`, options);          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();  
          console.log(data);       
          return data                
      } catch (error) {
          return console.error(error);
      }
  }  
  async getByidUser(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      };
      const response = await fetch(`${environment.APIURL}/test_lichsu/getByidUser`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._lichsus.next(data.items)
      this._totalCount.next(data.totalCount)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async getAll(){
    try {
      const options = {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const response = await fetch(`${environment.APIURL}/test_lichsu`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._lichsus.next(data.items)
      this._totalCount.next(data.totalCount)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  // getByid(id: any): Observable<any> {
  //   return this._httpClient.get<any>(`${environment.APIURL}/test_lichsu/${id}`).pipe(
  //     tap((response: any) => {
  //       this._lichsu.next(response);
  //       console.log(response);
  //     })
  //   );
  // }
  // getAll(): Observable<any[]> {
  //   return this._httpClient.get<any[]>(`${environment.APIURL}/test_lichsu`).pipe(
  //     tap((response: any[]) => {
  //       this._lichsus.next(response);
  //     })
  //   );
  // }
  // createPage(dulieu: any): Observable<any> {
  //   return this._httpClient.post<any>(`${environment.APIURL}/test_lichsu`, dulieu).pipe(
  //     map((res: any) => {
  //       this._lichsus.next(res);
  //       return res;
  //     }))
  // }
  // // createPage(dulieu: any): Observable<any> {
  // //   return this.lichsus$.pipe(
  // //     take(1),
  // //     switchMap(datas => this._httpClient.post<any>(`${environment.APIURL}/test_lichsu`, dulieu).pipe(
  // //       map((res: any) => {
  // //         this._lichsus.next([res[1], ...datas]);
  // //         return res[1];
  // //       })
  // //     ))
  // //   );
  // // }
  // updatePage(dulieu: any): Observable<any> {
  //   return this.lichsus$.pipe(
  //     take(1),
  //     switchMap((lichsus: any) =>
  //       this._httpClient.patch(`${environment.APIURL}/test_lichsu/${dulieu.id}`, dulieu).pipe(
  //         map((lichsu: any) => {
  //           const index = lichsus.findIndex((item: any) => item.id == lichsu.id);
  //           lichsus[index] = lichsu;
  //           this._lichsus.next(lichsus);
  //           return lichsu;
  //         })
  //       )
  //     ))
  // }
  // deletePage(dulieu: any) {
  //   return this.lichsus$.pipe(
  //     take(1),
  //     switchMap((lichsus: any) =>
  //       this._httpClient.delete(`${environment.APIURL}/test_lichsu/${dulieu.id}`).pipe(
  //         map((isDelete) => {
  //           const updatePhanquyens = lichsus.filter((e: any) => e.id != dulieu.id);
  //           this._lichsus.next(updatePhanquyens);
  //           return isDelete;
  //         })
  //       )
  //     ));
  // }
}
