import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { UserToken } from '../../models/user/userToken';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headers } from '../../util/util';


@Injectable()
export class UserService {

  url: string;
  private _showUser: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  showUserEmitter: Observable<string> = this._showUser.asObservable();

  constructor(private http: HttpClient, private router: Router) {
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

  public login(email: string, password: string): Observable<UserToken> {
    const user = {
      email, password
    };
    return this.http.post<UserToken>(this.url + '/login', user);
  }
  public storageUserAndToken(userToken: UserToken): User {
    localStorage.setItem('user', JSON.stringify(userToken.user));
    localStorage.setItem('token', userToken.token);
    this.showUser(userToken.user._id);
    return userToken.user;
  }

  public storageUser(user: User): User {
    localStorage.setItem('user', JSON.stringify(user));
    this.showUser(user._id);
    return user;
  }

  public register(user: User): Observable<UserToken> {
    return this.http.post<UserToken>(this.url, user);
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/' + this.getUser()._id, user, { headers });
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.showUser(null);
  }

  public uploadPhoto(file: File): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('file', file, file.name);
    const user: User = this.getUser();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(this.url + '/' + user._id + '/picture', formdata, { headers });
  }

  public getPhotoUrl(picture: string) {
    if (picture === undefined || picture == null) {
      return '#';
    }
    return this.url + '/image?id=' + picture;
  };

  public findById(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/' + id, { headers });
  }

}
