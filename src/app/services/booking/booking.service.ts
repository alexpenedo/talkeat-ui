import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Booking } from '../../models/booking/booking';
import { UserService } from '../user/user.service';


@Injectable()
export class BookingService {
  url: string;
  requestOptions: RequestOptions;

  constructor(private http: Http, private router: Router, private userService: UserService) {
    this.url = environment.apiUrl + 'booking';
    const headers: Headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.requestOptions = new RequestOptions({ headers: headers, params: new HttpParams() });
  }


  public save(booking: Booking) {
    this.http.post(this.url, booking, this.requestOptions)
      .subscribe(response => {
        const body = response.json();
        this.router.navigate(['/home']);
      });
  }

}
