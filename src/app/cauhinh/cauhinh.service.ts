import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CauhinhService {
  private _cauhinhs: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _cauhinh: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get cauhinhs$(): Observable<any[] | null> {
    return this._cauhinhs.asObservable();
  }
  get cauhinh$(): Observable<any | null> {
    return this._cauhinh.asObservable();
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
  async getAllCauhinh() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/cauhinh`,options);
          const data = await response.json();
          this._cauhinhs.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getCauhinhBySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/cauhinh/findslug/${Slug}`,options);
          const data = await response.json();
          console.log(data);
          this._cauhinh.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getCauhinhByid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/cauhinh/findid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._cauhinh.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchCauhinh(SearchParams:any) {
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/cauhinh/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._cauhinhs.next(data.items)
          this._totalCount.next(data.totalCount)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateCauhinh(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/cauhinh`, options);
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
  async SyncCauhinh(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/cauhinh/sync`, options);
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
  async UpdateCauhinh(item:any) {
    const cauhinhs:any = await this.cauhinhs$.pipe(take(1)).toPromise();
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/cauhinh/${item.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._cauhinh.next(data)
          const updateCauhinhs = cauhinhs.map((v:any) =>
            v.id === data.id ? data : v
          );
          this._cauhinhs.next(updateCauhinhs);
          return data;
      } catch (error) {
          return console.error(error);
      }
  }

  async DeleteCauhinh(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/cauhinh/${item.id}`, options);
          return await response.json();
      } catch (error) {
          return console.error(error);
      }
  }
}
