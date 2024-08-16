import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Mau2Service {
  private _mau2s: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _mau2: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get mau2s$(): Observable<any[] | null> {
    return this._mau2s.asObservable();
  }
  get mau2$(): Observable<any | null> {
    return this._mau2.asObservable();
  }
  get totalCount$(): Observable<any | null> {
    return this._totalCount.asObservable();
  }
  constructor() {}
  async getDrive() {
    const DriveID ="1VghpYpLVKug07LJm1-pdcpeQcEoh5VaCOgBvOfQ0-L8"
    const DriveSheet ="users"
    const DriveKey ="AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc"
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/DriveID/values/DriveSheet?key=DriveKey`,options);
    const data = await response.json();
          //this._userss.next(data)
    return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getAllMau2() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/mau2`,options);
          const data = await response.json();
          this._mau2s.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getMau2BySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/mau2/findslug/${Slug}`,options);
          const data = await response.json();
          this._mau2.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getMau2ByidBaocao(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/mau2/findidbaocao/${id}`,options);
          const data = await response.json();
          this._mau2.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getMau2Byid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/mau2/findid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._mau2.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchMau2(SearchParams:any) {
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/mau2/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._mau2s.next(data.items)
          this._totalCount.next(data.totalCount)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateMau2(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/mau2`, options);
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
  async SyncMau2(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/mau2/sync`, options);
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
  async UpdateMau2(item:any) {
    const mau2s:any = await this.mau2s$.pipe(take(1)).toPromise();
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/mau2/${item.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._mau2.next(data)
          // const updateMau2s = mau2s.map((v:any) =>
          //   v.id === data.id ? data : v
          // );
          // this._mau2s.next(updateMau2s);
          return data;
      } catch (error) {
          return console.error(error);
      }
  }

  async DeleteMau2(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/mau2/${item.id}`, options);
          return await response.json();
      } catch (error) {
          return console.error(error);
      }
  }
}

