import {environment} from '../../../../environments/environment';
import {Injectable} from '@angular/core';
import {Booking} from '../../../common/models/booking/booking';
import {UserService} from '../../../users/services/user/user.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../../common/models/user/user';
import {Status} from '../../../common/enums/status.enum';
import {Observable} from 'rxjs';
import {Rate} from '../../../common/models/rate/rate';


@Injectable()
export class BookingService {
  url: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.url = `${environment.apiUrl}bookings`;
  }

  public save(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.url, booking);
  }

  public findBookingsByGuestFinished(currentPage: number): Observable<Booking[]> {
    const guest: User = this.userService.getUser();
    const params: HttpParams = new HttpParams().set('guest', guest._id).set('status', Status.FINISHED.toString())
      .set('page', currentPage.toString()).set('size', '4');

    return this.http.get<Booking[]>(this.url, {params});
  }

  public findBookingsByGuestPending(currentPage: number): Observable<Booking[]> {
    const guest: User = this.userService.getUser();
    const params: HttpParams = new HttpParams().set('guest', guest._id).set('status', Status.PENDING.toString())
      .set('page', currentPage.toString()).set('size', '4');

    return this.http.get<Booking[]>(this.url, {params});
  }

  public findById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.url}/${id}`);
  }

  public getBookingRates(id: string): Observable<Rate[]> {
    return this.http.get<Rate[]>(`${this.url}/${id}/rates`);
  }

  public confirmBooking(id: string): Observable<Booking> {
    return this.http.post<Booking>(`${this.url}/${id}/confirm`, {});
  }

  public cancelBooking(id: string): Observable<Booking> {
    return this.http.post<Booking>(`${this.url}/${id}/cancel`, {});
  }


}
