import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number;
  lng: number;

  constructor() {
  }

  ngOnInit() {
    // let latitude:number;
    // let longitude:number;
    // window.navigator.geolocation.getCurrentPosition(function (position) {
    //   latitude = position.coords.latitude;
    //   this.lng = position.coords.longitude;
    // });
  }

}
