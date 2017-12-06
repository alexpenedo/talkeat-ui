import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../../models/user/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  public url: string;
  public user: User;
  private _showUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public showUserEmitter: Observable<User> = this._showUser.asObservable();

  constructor(private http: Http, private router: Router) {
    this.url = environment.apiUrl;
  }

  public getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
  public showUser() {
    this._showUser.next(this.getUser());
  }
  public login(email: string, password: string) {
    const user = {
      email, password
    };
    this.http.post(this.url + 'users/login', user)
      .subscribe(response => {
        const body = response.json();
        localStorage.setItem('user', JSON.stringify(body.user));
        localStorage.setItem('token', body.token);
        this.router.navigate(['/home']);
        this.showUser();
      });
  }
  public register(user: User) {
    this.http.post(this.url + 'users', user)
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

}
