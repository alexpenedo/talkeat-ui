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

  public url: string;
  private _showUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public showUserEmitter: Observable<User> = this._showUser.asObservable();
  private _showImage: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public showImageEmitter: Observable<string> = this._showImage.asObservable();

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
  public showUser() {
    this._showUser.next(this.getUser());
  }
  public showImage() {
    this._showImage.next(this.getPhotoUrl());
  }
  public isAuthenticated() {
    const token = localStorage.getItem('token');
    return token != null;
  }

  public login(email: string, password: string) {
    const user = {
      email, password
    };
    this.http.post(this.url + '/login', user)
      .subscribe(response => {
        const body = response.json();
        localStorage.setItem('user', JSON.stringify(body.user));
        localStorage.setItem('token', body.token);
        this.router.navigate(['/home']);
        this.showUser();
      });
  }
  public register(user: User) {
    this.http.post(this.url, user)
      .subscribe(response => {
        const body = response.json();
        localStorage.setItem('user', JSON.stringify(body.user));
        localStorage.setItem('token', body.token);
        this.showUser();
        this.router.navigate(['/home']);
      });
  }
  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.showUser();
  }

  public uploadPhoto(file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const headers: Headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const requestOptions = new RequestOptions({ headers, params: new HttpParams() });
    this.http.post(this.url + '/' + this.getUser()._id + '/picture', formdata, requestOptions)
      .subscribe(response => {
        this.showImage();
      });
  }

  public getPhotoUrl() {
    return this.url + '/' + this.getUser()._id + '/picture';
  }

}
