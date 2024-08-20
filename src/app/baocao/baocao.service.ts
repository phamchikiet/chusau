import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BaocaoService {
  private _baocaos: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _baocao: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get baocaos$(): Observable<any[] | null> {
    return this._baocaos.asObservable();
  }
  get baocao$(): Observable<any | null> {
    return this._baocao.asObservable();
  }
  get totalCount$(): Observable<any | null> {
    return this._totalCount.asObservable();
  }
  constructor() {}
  // async getDrive() {
  //   try {
  //     const options = {
  //       method:'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //   const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1VghpYpLVKug07LJm1-pdcpeQcEoh5VaCOgBvOfQ0-L8/values/baocao?key=AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc`,options);
  //   const data = await response.json();
  //         //this._baocaos.next(data)
  //   return data;
  //     } catch (error) {
  //         return console.error(error);
  //     }
  // }
  async getAllBaocao() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/baocao`,options);
          const data = await response.json();
          this._baocaos.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getBaocaoBySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/baocao/findslug/${Slug}`,options);
          const data = await response.json();
          this._baocao.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getBaocaoByid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/baocao/findid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._baocao.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchBaocao(SearchParams:any) {
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/baocao/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._baocaos.next(data.items)
          this._totalCount.next(data.totalCount)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateBaocao(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/baocao`, options);
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
  async SyncBaocao(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/baocao/sync`, options);
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
  async UpdateBaocao(item:any) {
    const baocaos:any = await this.baocaos$.pipe(take(1)).toPromise();
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/baocao/${item.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._baocao.next(data)
          const updateBaocaos = baocaos.map((v:any) =>
            v.id === data.id ? data : v
          );
          this._baocaos.next(updateBaocaos);
          return data;
      } catch (error) {
          return console.error(error);
      }
  }

  async DeleteBaocao(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/baocao/${item.id}`, options);
          return await response.json();
      } catch (error) {
          return console.error(error);
      }
  }
}
