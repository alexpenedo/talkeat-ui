import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Booking} from '../../models/booking/booking';
import {UserService} from '../user/user.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../models/user/user';
import {Status} from '../util/status.enum';
import {Observable} from 'rxjs';


@Injectable()
export class BookingService {
  url: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.url = `${environment.apiUrl}bookings`;
  }

  public save(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.url, booking);
  }

  public findBookingsByGuestFinished(): Observable<Booking[]> {
    const guest: User = this.userService.getUser();
    const params: HttpParams = new HttpParams().set('guestId', guest._id).set('status', Status.FINISHED.toString());

    return this.http.get<Booking[]>(this.url, {params});
  }

  public findBookingsByGuestPending(): Observable<Booking[]> {
    const guest: User = this.userService.getUser();
    const params: HttpParams = new HttpParams().set('guestId', guest._id).set('status', Status.PENDING.toString());

    return this.http.get<Booking[]>(this.url, {params});
  }

  public findById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.url}/${id}`);
  }

  public confirmBooking(id: string): Observable<Booking> {
    return this.http.post<Booking>(`${this.url}/${id}/confirm`, {});
  }

  public canceledBooking(id: string): Observable<Booking> {
    return this.http.post<Booking>(`${this.url}/${id}/cancel`, {});
  }


}
