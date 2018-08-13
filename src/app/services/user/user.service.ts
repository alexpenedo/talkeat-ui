import {environment} from './../../../environments/environment';
import {Injectable} from '@angular/core';
import {User} from '../../models/user/user';
import {UserToken} from '../../models/user/userToken';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class UserService {

  url: string;
  authUrl: string;
  private _showUser: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  showUserEmitter: Observable<string> = this._showUser.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.apiUrl + 'users';
    this.authUrl = environment.apiUrl + 'auth';
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
    return this.http.post<UserToken>(this.authUrl + '/login', user);
  }

  public storageUserAndToken(userToken: UserToken): User {
    localStorage.setItem('user', JSON.stringify(userToken.user));
    localStorage.setItem('token', userToken.tokens.accessToken);
    localStorage.setItem('refreshToken', userToken.tokens.refreshToken);

    this.showUser(userToken.user._id);
    return userToken.user;
  }

  public storageUser(user: User): User {
    localStorage.setItem('user', JSON.stringify(user));
    this.showUser(user._id);
    return user;
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/' + this.getUser()._id, user);
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.showUser(null);
  }

  public uploadPhoto(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.url}/picture`, formData);
  }

  public getPhotoUrl(picture: string) {
    if (picture === undefined || picture == null) {
      return '#';
    }
    return `${this.url}/picture?id=${picture}`;
  }

  public findById(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public refreshToken(): Observable<UserToken> {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(refreshToken);
    return this.http.post<any>(`${this.authUrl}/refresh-token`, {refreshToken});
  }
}
