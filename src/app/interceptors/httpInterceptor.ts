import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {UserService} from '../services/user/user.service';


@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  config: MatSnackBarConfig;

  constructor(public userService: UserService, public snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
    this.config.panelClass = ['error'];
    this.config.duration = 2000;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addTokenToRequest(request, this.userService.getToken()))
      .catch((err) => {
        if (err instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>err).status) {
            case 401:
              return <any>this.refreshToken(request, next);
          }
          this.snackBar.open(err.error.message, undefined, this.config);
          return Observable.throw(err);
        } else {
          this.snackBar.open(err.error.message, undefined, this.config);
          return Observable.throw(err);
        }
      }) as any;
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler) {
    this.userService.refreshToken().subscribe(userToken => {
      this.userService.storageUserAndToken(userToken);
      return next.handle(this.addTokenToRequest(request, userToken.tokens.accessToken));
    });
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }
}
