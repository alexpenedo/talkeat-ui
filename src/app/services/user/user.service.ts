import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { User } from '../../models/user/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {

  url: string;
  private _showUser: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  showUserEmitter: Observable<string> = this._showUser.asObservable();

  constructor(private http: Http, private router: Router) {
    this.url = environment.apiUrl + 'users';
  }

  public getUser(): User {
    const user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    }
    return null;
  }
  public showUser(userId: string) {
    this._showUser.next(userId);
  }

  public isAuthenticated() {
    const token = localStorage.getItem('token');
    return token != null;
  }

  public login(email: string, password: string): Observable<User> {
    const user = {
      email, password
    };
    return this.http.post(this.url + '/login', user)
      .map((response) => {
        const body = response.json();
        const user: User = body.user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', body.token);
        this.showUser(user._id);
        return user;
      });
  }
  public register(user: User) {
    this.http.post(this.url, user)
      .subscribe(response => {
        this.login(user.email, user.password);
      });
  }
  public update(user: User) {
    const headers: Headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const requestOptions = new RequestOptions({ headers, params: new HttpParams() });
    this.http.put(this.url + '/' + this.getUser()._id, user, requestOptions)
      .subscribe(response => {
        const body = response.json();
        localStorage.setItem('user', JSON.stringify(body));
        this.router.navigate(['/home']);
        this.showUser("id");
      });
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.showUser(null);
  }

  public uploadPhoto(file: File): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const headers: Headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const requestOptions = new RequestOptions({ headers, params: new HttpParams() });
    const user: User = this.getUser();
    return this.http.post(this.url + '/' + user._id + '/picture', formdata, requestOptions)
      .map((response) => {
        this.showUser(user._id);
      });
  }

  public getPhotoUrl(userId: string) {
    return this.url + '/' + userId + '/picture?' + Math.random();
  }

}
