import { Menu } from './../../models/menu/menu';
import { User } from './../../models/user/user';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { Coordinates } from './../../models/coordinates/coordinates';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MenuService]
})
export class HomeComponent implements OnInit {
  persons: string;
  longitude: number;
  latitude: number;
  date: Date;
  type: string;
  menus: Menu[];

  userSettings: any;


  constructor(private menuService: MenuService, private geolocationService: GeolocationService) {
    this.persons = '2';
    this.date = new Date();
    this.type = this.date.getHours() > 17 ? "dinner" : "lunch";
  }
  ngOnInit() {
    let lastCoordinates: Coordinates = this.geolocationService.getLastCoordinatesSearch();
    if (lastCoordinates != undefined) {
      this.longitude = lastCoordinates.longitude;
      this.latitude = lastCoordinates.latitude;
      this.find();
    }
    this.userSettings = {
      inputPlaceholderText: 'Enter your postal code or town',
      showSearchButton: false,
      geoCountryRestriction: ["es"],
      inputString: this.geolocationService.getLastLocationSearch()
    };

  }

  autocompleteHandler(selectedData: any) {
    if (selectedData && selectedData.data) {
      this.longitude = selectedData.data.geometry.location.lng;
      this.latitude = selectedData.data.geometry.location.lat;
      this.find();
    }
  }

  find() {
    this.menuService.find(this.longitude, this.latitude, this.persons, this.date, this.type)
      .subscribe(menus => {
        this.menus = menus;
      });
  }

}
