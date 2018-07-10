import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
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
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userService.getToken()}`
      }
    });
    return next.handle(request)
      .catch((err) => {
        this.snackBar.open(err.error.message, undefined, this.config);
        return Observable.throw(err);
      }) as any;
  }
}
