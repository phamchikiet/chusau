import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  take,
  switchMap,
  map,
  filter,
  throwError,
  of,
  catchError,
  ReplaySubject,
  from,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from '../shared/localstorage.service';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _users: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  private _user: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _profile: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get totalCount$(): Observable<any | null> {
    return this._totalCount.asObservable();
  }
  private APIURL: string = environment.APIURL;
  constructor(
    private _StorageService: StorageService
  ) {}
  get users$(): Observable<any[]> {
    return this._users.asObservable();
  }
  get user$(): Observable<any> {
    return this._user.asObservable();
  }
  get profile$(): Observable<any>
  {
      return this._profile.asObservable();
  }
  set accessToken(token: string) {
    this._StorageService.setItem('CSVC_Token', token);
  }
  get accessToken(): string {
    return this._StorageService.getItem('CSVC_Token') ?? '';
  }

  async SearchUsers(SearchParams:any) {    
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/test_users/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();   
          this._users.next(data.item)              
          this._totalCount.next(data.totalCount)              
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  getUsers(): Observable<any[]> {
    return from(fetch(`${this.APIURL}/test_users`)).pipe(
      switchMap((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }),
      tap((ves: any[]) => {
        this._users.next(ves);
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  

  getAdmin(): Observable<any[]> {
    return from(fetch(`${this.APIURL}/test_users/get/admin`)).pipe(
      switchMap((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }),
      tap((ves: any[]) => {
        return ves;
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  Dangky(user: any): Observable<any> {
    return from(fetch(`${this.APIURL}/test_users/dangky`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })).pipe(
      switchMap((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  getUserByid(id: any): Observable<any> {
    return from(fetch(`${this.APIURL}/test_users/${id}`)).pipe(
      switchMap((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }),
      tap((response: any) => {
        this._user.next(response);
        return response;
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  updateUser(dulieu: any): Observable<any> {
    return this.users$.pipe(
      take(1),
      switchMap((Users: any) =>
        from(fetch(`${this.APIURL}/test_users/${dulieu.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dulieu)
        })).pipe(
          switchMap((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          }),
          map((user: any) => {
            const index = Users.findIndex((item: any) => item.id === user.id);
            Users[index] = user;
            this._users.next(Users);
            return user;
          }),
          catchError((error) => {
            console.error(error);
            return throwError(error);
          })
        )
      )
    );
  }

  updateOneUser(dulieu: any): Observable<any> {
    console.log(dulieu);

    return from(fetch(`${this.APIURL}/test_users/${dulieu.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dulieu)
    })).pipe(
      switchMap((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }),
      map((user: any) => {
        this._profile.next(user);
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  changepass(data: any): Observable<any> {
    return from(fetch(`${environment.APIURL}/test_auth/changepass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })).pipe(
      switchMap((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }),
      tap((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  Randompass(data: any): Observable<any> {
    return from(fetch(`${environment.APIURL}/test_auth/randompass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })).pipe(
      switchMap((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }),
      tap((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  async getProfile() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
      };
      const response = await fetch(`${environment.APIURL}/test_auth/profile`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._profile.next(data);
    } catch (error) {
      return console.error(error);
    }
  }
    // try {
    //   return (fetch(`${this.APIURL}/test_auth/profile`)).pipe(
    //     switchMap((response) => {
    //       if (!response.ok) {
    //         throw new Error(response.statusText);
    //       }
    //       return response.json();
    //     }),
    //     tap((response: any) => {
    //       this._profile.next(response);
    //     }),
    //     catchError((error) => {
    //       console.error(error);
    //       return throwError(error);
    //     })
    //   );
    // }

    // return from(fetch(`${this.APIURL}/test_auth/profile`)).pipe(
    //   switchMap((response) => {
    //     if (!response.ok) {
    //       throw new Error(response.statusText);
    //     }
    //     return response.json();
    //   }),
    //   tap((response: any) => {
    //     this._profile.next(response);
    //   }),
    //   catchError((error) => {
    //     console.error(error);
    //     return throwError(error);
    //   })
    // );
} 
