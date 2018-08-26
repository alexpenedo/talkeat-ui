import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Rate} from '../../../common/models/rate/rate';
import {Observable} from 'rxjs';

@Injectable()
export class RateService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'rates';
  }

  public save(rate: Rate): Observable<Rate> {
    return this.http.post<Rate>(this.url, rate);
  }

  public getRateAverage(host: string): Observable<any> {
    const params: HttpParams = new HttpParams().set('hostId', host);
    return this.http.get<any>(this.url + '/average', {params});
  }

  public getRatesByHostId(hostId: string): Observable<Rate[]> {
    const params: HttpParams = new HttpParams().set('hostId', hostId);
    return this.http.get<Rate[]>(this.url, {params});
  }

  public getRatesByGuestId(guestId: string): Observable<Rate[]> {
    const params: HttpParams = new HttpParams().set('guestId', guestId);
    return this.http.get<Rate[]>(this.url, {params});
  }

}
