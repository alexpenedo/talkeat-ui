import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from './../../../environments/environment';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Rate} from '../../models/rate/rate';

@Injectable()
export class RateService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'rate';
  }

  public save(rate: Rate): Observable<Rate> {
    return this.http.post<Rate>(this.url, rate);
  }

  public getRateAverage(host: string): Observable<any> {
    const params: HttpParams = new HttpParams().set('hostId', host);
    return this.http.get<any>(this.url + '/average', {params});
  }

  public getRatesByHostId(host: string): Observable<Rate[]> {
    const params: HttpParams = new HttpParams().set('hostId', host);
    return this.http.get<Rate[]>(this.url, {params});
  }

}
