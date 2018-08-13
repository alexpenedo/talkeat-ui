import {Injectable} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {Coordinates} from '../../models/coordinates/coordinates';
import {Observable} from 'rxjs';
declare var google: any;


const GEOLOCATION_ERRORS = {
  'errors.location.unsupportedBrowser': 'Browser does not support location services',
  'errors.location.permissionDenied': 'You have rejected access to your location',
  'errors.location.positionUnavailable': 'Unable to determine your location',
  'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class GeolocationService {

  constructor(private mapsAPILoader: MapsAPILoader) {
  }

  public getCoordinatesByAddress(address: string): Observable<Coordinates> {
    return Observable.create(observer => {
      this.mapsAPILoader.load().then(() => {
        const geoCoder = new google.maps.Geocoder();
        geoCoder.geocode({'address': address}, (results) => {
          const coordinates: Coordinates = new Coordinates(results[0].geometry.location.lat(),
            results[0].geometry.location.lng());
          observer.next(coordinates);
          observer.complete();
        });
      });
    });
  }

  public getLastCoordinatesSearch(): Coordinates {
    const recentSearches = this.getRecentSearches();
    if (recentSearches !== undefined && recentSearches != null && recentSearches.length > 0) {
      return new Coordinates(recentSearches[0].geometry.location.lat, recentSearches[0].geometry.location.lng);
    }
  }

  public getLastLocationSearch(): string {
    const recentSearches = this.getRecentSearches();
    if (recentSearches !== undefined && recentSearches != null && recentSearches.length > 0) {
      return recentSearches[0].description;
    }
  }

  private getRecentSearches(): any[] {
    const recentSearches = localStorage.getItem('recentSearches');
    if (recentSearches !== undefined) {
      return JSON.parse(recentSearches);
    }
  }

  public getLocation(geoLocationOptions?: any): Observable<any> {
    geoLocationOptions = geoLocationOptions || {timeout: 5000};

    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            switch (error.code) {
              case 1:
                observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                break;
              case 2:
                observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                break;
              case 3:
                observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                break;
            }
          },
          geoLocationOptions);
      } else {
        observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
      }
    });
  }
}
