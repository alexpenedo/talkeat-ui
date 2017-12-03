import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../../models/user/user';

@Injectable()
export class UserService {

  public url: string;

  constructor(private http: Http) {
    this.url = environment.apiUrl;
  }

  public login(email: string, password: string) {
    const user = {
      email, password
    };
    console.log(user);
    this.http.post(this.url + 'users/login', user)
      .subscribe(response => {
        const body = response.json();
        localStorage.setItem('user', JSON.stringify(body.user));
        localStorage.setItem('token', body.token);
      });
  }

  public register(user: User) {
    this.http.post(this.url + 'users', user)
    .subscribe(response => {
      const body = response.json();
      localStorage.setItem('user', JSON.stringify(body.user));
      localStorage.setItem('token', body.token);
    });
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

}
