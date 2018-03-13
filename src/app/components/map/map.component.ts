import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { Menu } from '../../models/menu/menu';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  errorMsg: string;
  currentLocation: Coordinates;
  zoom: number = 15;
  latitude: number = 43.3574124;
  longitude: number = -8.399765800000068;
  @Input() menus: Menu[];

  constructor(private ref: ChangeDetectorRef,
    private geoLocationService: GeolocationService) { }

  ngOnInit() {
    let self = this;
    const accuracy = { enableHighAccuracy: true };
    self.geoLocationService.getLocation(accuracy).subscribe(function (position) {
      self.currentLocation = position;
      console.log(position);
      self.ref.detectChanges();
    }, function (error) { self.errorMsg = error; self.ref.detectChanges(); });

  }

}
