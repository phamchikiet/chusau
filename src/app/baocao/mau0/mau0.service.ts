import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Mau0Service {
  private _mau0s: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _mau0: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get mau0s$(): Observable<any[] | null> {
    return this._mau0s.asObservable();
  }
  get mau0$(): Observable<any | null> {
    return this._mau0.asObservable();
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
  async getAllMau0() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/mau0`,options);
          const data = await response.json();
          this._mau0s.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getMau0BySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/mau0/findslug/${Slug}`,options);
          const data = await response.json();
          this._mau0.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getMau0ByidBaocao(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/mau0/findidbaocao/${id}`,options);
          const data = await response.json();
          this._mau0.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getMau0Byid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/mau0/findid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._mau0.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchMau0(SearchParams:any) {
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/mau0/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._mau0s.next(data.items)
          this._totalCount.next(data.totalCount)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateMau0(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/mau0`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data
      } catch (error) {
          return console.error(error);
      }
  }
  async SyncMau0(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/mau0/sync`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data
      } catch (error) {
          return console.error(error);
      }
  }
  async UpdateMau0(item:any) {
    const mau0s:any = await this.mau0s$.pipe(take(1)).toPromise();
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/mau0/${item.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._mau0.next(data)
          const updateMau0s = mau0s.map((v:any) =>
            v.id === data.id ? data : v
          );
          this._mau0s.next(updateMau0s);
          return data;
      } catch (error) {
          return console.error(error);
      }
  }

  async DeleteMau0(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/mau0/${item.id}`, options);
          return await response.json();
      } catch (error) {
          return console.error(error);
      }
  }
}

