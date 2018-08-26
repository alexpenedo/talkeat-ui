import {Menu} from '../../../common/models/menu/menu';
import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../../menus/services/menu/menu.service';
import {GeolocationService} from '../../../map/services/geolocation/geolocation.service';
import {Coordinates} from '../../../common/models/coordinates/coordinates';
import {Sort} from '../../../common/enums/sort.enum';

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
  sort: Sort;
  menus: Menu[];
  userSettings: any;
  currentPage: number;
  minDate: Date;


  constructor(private menuService: MenuService,
              private geolocationService: GeolocationService) {

  }

  ngOnInit() {
    this.persons = '2';
    this.currentPage = 0;
    this.minDate = new Date();
    this.date = new Date();
    this.sort = Sort.DISTANCE;
    this.type = this.date.getHours() > 17 ? 'dinner' : 'lunch';
    const lastCoordinates: Coordinates = this.geolocationService.getLastCoordinatesSearch();
    if (lastCoordinates !== undefined) {
      this.longitude = lastCoordinates.longitude;
      this.latitude = lastCoordinates.latitude;
      this.find();
    }
    this.userSettings = {
      inputPlaceholderText: 'Enter your postal code or town',
      showSearchButton: false,
      geoCountryRestriction: ['es'],
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

  onScrollDown() {
    this.currentPage++;
    this.findMenus();
  }

  find() {
    this.menus = [];
    this.currentPage = 0;
    this.findMenus();
  }

  private findMenus() {
    this.menuService.find(this.longitude, this.latitude, this.persons, this.date, this.type, this.currentPage, this.sort)
      .subscribe((menus: Menu[]) => {
        this.menus.push(...menus);
        this.menus.map((menu) => {
          menu.label = {
            fontSize: '15px',
            text: menu.price.toFixed(2) + ' $',
            fontWeight: 'bold',
          };
        });
      });
  }
}
