import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../interfaces/user';
import {Token} from '../interfaces/token';
import {merge, Observable, of} from 'rxjs';
import {TokenService} from './token-service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _
  private readonly _backendURL: any;
  private readonly _defaultUser: User;

  constructor(private _http: HttpClient,
              private _token: TokenService) {
    this._defaultUser = {
      'username': 'John',
      'password': 'Doe'
    };
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

  /**
   * Returns private property _defaultPerson
   */
  get defaultUser(): User {
    return this._defaultUser;
  }

  connect(user: User): Observable<any> {
    return this._http.post<Token>(this._backendURL.connect, user).pipe(
      map(_ => this._token.set(_)),
    )
  }

  subscribe(user: User): Observable<any>{
    return this._http.post<Token>(this._backendURL.subscribe, user).pipe(
      map(_ => this._token.set(_)),
    )
  }

  delete(): Observable<any> {
    return this._http.delete(this._backendURL.profile).pipe(
      map(_ => this._token.del())
    );
  }

  modify(_user: string, value: any): Observable<any>{
    return this._http.put(this._backendURL.profile,
      {
        password: value.password,
        username: _user
      }
    ).pipe(
      map(_ => this._token.del())
    );
  }

  logout(){
    this._token.del();
  }
}
