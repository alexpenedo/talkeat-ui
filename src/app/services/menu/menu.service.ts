import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from './../../../environments/environment';
import { Menu } from './../../models/menu/menu';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MenuService {
  url: string;
  requestOptions: RequestOptions;

  constructor(private http: Http, private router: Router) {
    this.url = environment.apiUrl + 'menu';
    const headers: Headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.requestOptions = new RequestOptions({ headers: headers, params: new HttpParams() });
  }

  public save(menu: Menu) {
    this.http.post(this.url, menu, this.requestOptions)
      .subscribe(response => {
        const body = response.json();
        this.router.navigate(['/home']);
      });
  }

  public find(postalCode: string, persons: string, date: Date, type: string): Observable<Menu[]> {
    const params = new HttpParams();
    this.requestOptions.params.set('postalCode', postalCode);
    this.requestOptions.params.set('persons', persons);
    this.requestOptions.params.set('date', date.toString());
    this.requestOptions.params.set('type', type);
    return this.http.get(this.url, this.requestOptions).map((response) => {
      return <Menu[]>response.json();
    });
  }

}
