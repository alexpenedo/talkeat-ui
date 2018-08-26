import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor, HttpProgressEvent,
  HttpRequest, HttpResponse,
  HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import {UserService} from '../../users/services/user/user.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  config: MatSnackBarConfig;

  constructor(public userService: UserService, public snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
    this.config.panelClass = ['error'];
    this.config.duration = 2000;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent |
    HttpResponse<any> | HttpUserEvent<any>> {
    return next.handle(this.addTokenToRequest(request, this.userService.getToken())).pipe(
      catchError((error, caught) => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 401:
              this.refreshToken(request, next);
              break;
            case 400:
              this.snackBar.open(error.error.error, undefined, this.config);
              break;
          }
        } else {
          this.snackBar.open(error.error.message, undefined, this.config);
        }
        return of(error);
      }) as any);
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
