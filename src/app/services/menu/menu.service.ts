import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from './../../../environments/environment';
import {Menu} from './../../models/menu/menu';
import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../../models/user/user';

@Injectable()
export class MenuService {
  url: string;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    this.url = environment.apiUrl + 'menu';
  }

  public save(menu: Menu): Observable<Menu> {
    menu.host = this.userService.getUser();
    return this.http.post<Menu>(this.url, menu,);
  }

  public find(longitude: number, latitude: number, persons: string, date: Date, type: string): Observable<Menu[]> {
    const user: User = this.userService.getUser();
    const params: HttpParams = new HttpParams().set('longitude', longitude.toString())
      .set('latitude', latitude.toString()).set('persons', persons)
      .set('date', date.toString()).set('type', type).set('user', user._id);

    return this.http.get<Menu[]>(this.url, {params});
  }

  public findById(id: string): Observable<Menu> {
    return this.http.get<Menu>(this.url + '/' + id);
  }
}
