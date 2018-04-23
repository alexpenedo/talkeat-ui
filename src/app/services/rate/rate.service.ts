import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import 'rxjs/add/operator/map';
import { Booking } from '../../models/booking/booking';
import { UserService } from '../user/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { headers } from '../../util/util';
import { Rate } from '../../models/rate/rate';
import { User } from '../../models/user/user';

@Injectable()
export class RateService {

  url: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.url = environment.apiUrl + 'rate';
  }
  public save(rate: Rate): Observable<Rate> {
    return this.http.post<Rate>(this.url, rate, { headers });
  }

  public getRateAverage(host: string): Observable<any> {
    const params: HttpParams = new HttpParams().set('hostId', host);
    return this.http.get<any>(this.url + "/average", { headers, params });
  }

  public getRatesByHostId(host: string): Observable<Rate[]> {
    const params: HttpParams = new HttpParams().set('hostId', host);
    return this.http.get<Rate[]>(this.url, { headers, params });
  }

}
