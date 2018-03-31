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
        return this.storageUserAndToken(response);
      });
  }
  private storageUserAndToken(response): User {
    const body = response.json();
    const user: User = body.user;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', body.token);
    this.showUser(user._id);
    return user;
  }
  private storageUser(response): User {
    const user = <User>response.json();
    localStorage.setItem('user', JSON.stringify(user));
    this.showUser(user._id);
    return user;
  }
  public register(user: User): Observable<User> {
    return this.http.post(this.url, user)
      .map(response => {
        return this.storageUserAndToken(response);
      });
  }
  public update(user: User): Observable<User> {
    const headers: Headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const requestOptions = new RequestOptions({ headers, params: new HttpParams() });
    return this.http.put(this.url + '/' + this.getUser()._id, user, requestOptions)
      .map(response => {
        return this.storageUser(response);
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
        this.storageUser(response);
      });
  }

  public getPhotoUrl(userId: string) {
    return this.url + '/' + userId + '/picture?' + Math.random();
  }

}
