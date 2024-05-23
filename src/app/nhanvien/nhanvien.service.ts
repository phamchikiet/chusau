import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NhanvienService {
  private _nhanviens: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _nhanvien: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get nhanviens$(): Observable<any[] | null> {
    return this._nhanviens.asObservable();
  }
  get nhanvien$(): Observable<any | null> {
    return this._nhanvien.asObservable();
  }
  get totalCount$(): Observable<any | null> {
    return this._totalCount.asObservable();
  }
  constructor() { }
  async getDrive() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1VghpYpLVKug07LJm1-pdcpeQcEoh5VaCOgBvOfQ0-L8/values/nhanvien?key=AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc`, options);
      const data = await response.json();
      //this._nhanviens.next(data)                 
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async getAllNhanvien() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/test_nhanvien`, options);
      const data = await response.json();
      this._nhanviens.next(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async getNhanvienBySlug(Slug: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/test_nhanvien/findslug/${Slug}`, options);
      const data = await response.json();
      this._nhanvien.next(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async getNhanvienByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/test_nhanvien/findByid/${id}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._nhanvien.next(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async SearchNhanvien(SearchParams: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
      const response = await fetch(`${environment.APIURL}/test_nhanvien/search`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._nhanviens.next(data.item)
      this._totalCount.next(data.totalCount)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async CreateNhanvien(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/nhanvien`, options);
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
  async SyncNhanvien(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/test_nhanvien/sync`, options);
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
  async UpdateNhanvien(item: any) {
    const nhanviens: any = await this.nhanviens$.pipe(take(1)).toPromise();
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/test_nhanvien/${item.id}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._nhanvien.next(data)
      const updateNhanviens = nhanviens.map((v: any) =>
        v.id === data.id ? data : v
      );
      this._nhanviens.next(updateNhanviens);
      return data;
    } catch (error) {
      return console.error(error);
    }
  }

  async DeleteNhanvien(item: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/test_nhanvien/${item.id}`, options);
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  }

  async changepass(data: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      };
      const response = await fetch(`${environment.APIURL}/test_users/changepass`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  }

  async Randompass(data: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      };
      const response = await fetch(`${environment.APIURL}/test_auth/randompass`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  }
}