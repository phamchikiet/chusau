import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Mau3Service {
  private _mau3s: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _mau3: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get mau3s$(): Observable<any[] | null> {
    return this._mau3s.asObservable();
  }
  get mau3$(): Observable<any | null> {
    return this._mau3.asObservable();
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
  async getAllMau3() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/mau3`,options);
          const data = await response.json();
          this._mau3s.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getMau3BySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/mau3/findslug/${Slug}`,options);
          const data = await response.json();
          this._mau3.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getMau3ByidBaocao(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/mau3/findidbaocao/${id}`,options);
          const data = await response.json();
          console.log(data);

          this._mau3.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getMau3Byid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/mau3/findid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._mau3.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchMau3(SearchParams:any) {
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/mau3/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._mau3s.next(data.items)
          this._totalCount.next(data.totalCount)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateMau3(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/mau3`, options);
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
  async SyncMau3(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/mau3/sync`, options);
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
  async UpdateMau3(item:any) {
    const mau3s:any = await this.mau3s$.pipe(take(1)).toPromise();
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/mau3/${item.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._mau3.next(data)
          console.log(data);

          // const updateMau3s = mau3s.map((v:any) =>
          //   v.id === data.id ? data : v
          // );
          // this._mau3s.next(updateMau3s);
          return data;
      } catch (error) {
          return console.error(error);
      }
  }

  async DeleteMau3(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/mau3/${item.id}`, options);
          return await response.json();
      } catch (error) {
          return console.error(error);
      }
  }
}

