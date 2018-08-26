import {Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import {GeolocationService} from '../../services/geolocation/geolocation.service';
import {Menu} from '../../../common/models/menu/menu';
import {Marker} from '@agm/core/services/google-maps-types';
import {UtilService} from '../../../common/services/util/util.service';
import {Coordinates} from '../../../common/models/coordinates/coordinates';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  errorMsg: string;
  currentLocation: Coordinates;
  zoom: number;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() menus: Menu[];

  constructor(private ref: ChangeDetectorRef,
              private geoLocationService: GeolocationService, private utilService: UtilService) {
    this.zoom = 15;
  }

  ngOnInit() {
    const self = this;
    const accuracy = {enableHighAccuracy: true};
    self.geoLocationService.getLocation(accuracy).subscribe(function (position) {
      self.currentLocation = position;

      if (self.latitude === undefined || self.latitude == null) {
        self.latitude = position.coords.latitude;
        self.longitude = position.coords.longitude;
      }
      self.ref.detectChanges();
    }, function (error) {
      self.errorMsg = error;
      self.ref.detectChanges();
    });
  }


  markerClicked(marker: Marker, menu: Menu) {
    this.utilService.disableMenus();
    const element: Element = document.getElementById(menu._id);
    element.scrollIntoView({block: 'end', behavior: 'smooth'});
    this.utilService.activeMenu(menu._id);
  }
}
