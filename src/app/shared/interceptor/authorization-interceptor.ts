import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TokenService} from '../services/token-service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private _token: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this._token.get();
    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${token.access_token}`
      }
    });

    return next.handle(req);
  }
}
