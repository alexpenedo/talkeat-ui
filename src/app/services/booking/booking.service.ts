import {Observable} from 'rxjs/Observable';
import {environment} from './../../../environments/environment';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Booking} from '../../models/booking/booking';
import {UserService} from '../user/user.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../models/user/user';


@Injectable()
export class BookingService {
  url: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.url = environment.apiUrl + 'booking';
  }

  public save(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.url, booking);
  }

  public findBookingsByGuestFinished(): Observable<Booking[]> {
    const guest: User = this.userService.getUser();
    const today: string = new Date().toString();
    const params: HttpParams = new HttpParams().set('guestId', guest._id).set('dateTo', today);

    return this.http.get<Booking[]>(this.url, {params});
  }

  public findBookingsByGuestPending(): Observable<Booking[]> {
    const guest: User = this.userService.getUser();
    const today: string = new Date().toString();
    const params: HttpParams = new HttpParams().set('guestId', guest._id).set('dateFrom', today);

    return this.http.get<Booking[]>(this.url, {params});
  }

  public findById(id: string): Observable<Booking> {
    return this.http.get<Booking>(this.url + '/' + id);
  }

}
