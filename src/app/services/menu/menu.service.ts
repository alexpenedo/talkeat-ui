import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Menu} from '../../models/menu/menu';
import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../../models/user/user';
import {Booking} from '../../models/booking/booking';
import {Status} from '../util/status.enum';
import {Observable} from 'rxjs';
import {Sort} from '../util/sort.enum';

@Injectable()
export class MenuService {
  url: string;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    this.url = environment.apiUrl + 'menus';
  }

  public save(menu: Menu): Observable<Menu> {
    menu.host = this.userService.getUser();
    return this.http.post<Menu>(this.url, menu);
  }

  public update(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.url}/${menu._id}/`, menu);
  }

  public find(longitude: number, latitude: number, persons: string, date: Date,
              type: string, currentPage: number, sort: Sort): Observable<Menu[]> {
    const user: User = this.userService.getUser();
    const userId: string = user ? user._id : '';
    const params: HttpParams = new HttpParams().set('longitude', longitude.toString())
      .set('latitude', latitude.toString()).set('persons', persons)
      .set('date', date.toISOString()).set('type', type)
      .set('userId', userId).set('sort', sort.toString()).set('page', currentPage.toString()).set('size', '4');
    return this.http.get<Menu[]>(`${this.url}/located`, {params});
  }

  public findUserMenusFinished(currentPage: number): Observable<Menu[]> {
    const user: User = this.userService.getUser();
    const params: HttpParams = new HttpParams().set('host', user._id).set('status', Status.FINISHED.toString())
      .set('page', currentPage.toString()).set('size', '4');
    return this.http.get<Menu[]>(this.url, {params});
  }

  public findUserMenusPending(currentPage: number): Observable<Menu[]> {
    const user: User = this.userService.getUser();
    const params: HttpParams = new HttpParams().set('host', user._id).set('status', Status.PENDING.toString())
      .set('page', currentPage.toString()).set('size', '4');
    return this.http.get<Menu[]>(this.url, {params});
  }

  public findBookingsByMenuId(id: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.url}/${id}/bookings`);
  }

  public findById(id: string): Observable<Menu> {
    return this.http.get<Menu>(`${this.url}/${id}`);
  }

  cancelMenu(id: string) {
    return this.http.post<Menu>(`${this.url}/${id}/cancel`, {});
  }
}
