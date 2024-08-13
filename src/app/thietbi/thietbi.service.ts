import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ThietbiService {
  private _thietbis: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _thietbi: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get thietbis$(): Observable<any[] | null> {
    return this._thietbis.asObservable();
  }
  get thietbi$(): Observable<any | null> {
    return this._thietbi.asObservable();
  }
  get totalCount$(): Observable<any | null> {
    return this._totalCount.asObservable();
  }
  constructor() {}
  async getDrive() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1VghpYpLVKug07LJm1-pdcpeQcEoh5VaCOgBvOfQ0-L8/values/thietbi?key=AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc`,options);
    const data = await response.json();
          //this._thietbis.next(data)
    return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getAllThietbi() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/test_thietbi`,options);
          const data = await response.json();
          this._thietbis.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getThietbiBySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/test_thietbi/findslug/${Slug}`,options);
          const data = await response.json();
          this._thietbi.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getThietbiByid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/test_thietbi/findByid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._thietbi.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchThietbi(SearchParams:any) {
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/test_thietbi/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._thietbis.next(data.item)
          this._totalCount.next(data.totalCount)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateThietbi(item:any) {
    try {
      const thietbis:any = await this.thietbis$.pipe(take(1)).toPromise();
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/test_thietbi`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const newthietbis = [...thietbis,data]
          this._thietbis.next(newthietbis)
          return data
      } catch (error) {
          return console.error(error);
      }
  }
  async SyncThietbi(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/test_thietbi/sync`, options);
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
  async UpdateThietbi(item:any) {
    const thietbis:any = await this.thietbis$.pipe(take(1)).toPromise();
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/test_thietbi/${item.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._thietbi.next(data)
          const updateThietbis = thietbis.map((v:any) =>
            v.id === data.id ? data : v
          );
          this._thietbis.next(updateThietbis);
          return data;
      } catch (error) {
          return console.error(error);
      }
  }

  async DeleteThietbi(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/test_thietbi/${item.id}`, options);
          return await response.json();
      } catch (error) {
          return console.error(error);
      }
  }
}
