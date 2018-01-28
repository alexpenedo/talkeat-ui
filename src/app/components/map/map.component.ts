import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GeolocationService } from '../../services/geolocation/geolocation.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [GeolocationService]
})
export class MapComponent implements OnInit {
  errorMsg: string;
  currentLocation: Coordinates;
  zoom: number = 15;

  constructor(private ref: ChangeDetectorRef,
    private geoLocationService: GeolocationService) { }

  ngOnInit() {
    let self = this;
    const accuracy = { enableHighAccuracy: true };
    self.geoLocationService.getLocation(accuracy).subscribe(function (position) {
      self.currentLocation = position;
      console.log(self.currentLocation);
      self.ref.detectChanges();
    }, function (error) { self.errorMsg = error; self.ref.detectChanges(); });
  }

}
