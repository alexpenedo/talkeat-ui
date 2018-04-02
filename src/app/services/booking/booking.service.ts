import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Booking } from '../../models/booking/booking';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { headers } from '../../util/util';


@Injectable()
export class BookingService {
  url: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.url = environment.apiUrl + 'booking';
  }

  public save(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.url, booking, { headers });
  }

}
