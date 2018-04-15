import { MenuService } from './../../../services/menu/menu.service';
import { dishValidator } from '../validators/dishValidator';
import { Menu } from './../../../models/menu/menu';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../../../models/user/user';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { Router } from '@angular/router';
import { Coordinates } from '../../../models/coordinates/coordinates';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css'],
  providers: [MenuService]
})
export class CreateMenuComponent implements OnInit {
  user: User;
  menu: Menu;
  menuDescription: FormGroup;
  addDishes: FormGroup;
  completeData: FormGroup;
  coordinates: Coordinates;

  constructor(private menuService: MenuService, private userService: UserService,
    private geolocationService: GeolocationService, private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.menuDescription = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.addDishes = this.formBuilder.group({
      starters: this.formBuilder.array([]),
      mains: this.formBuilder.array([]),
      desserts: this.formBuilder.array([]),
    },
      { validator: dishValidator }
    );
    this.completeData = this.formBuilder.group({
      guests: ['', Validators.required],
      price: ['', Validators.required],
      date: [new Date(), Validators.required],
      time: ['', Validators.required],
      address: [this.user != null ? this.user.address : '', Validators.required],
      country: [this.user != null ? this.user.country : '', Validators.required],
      postalCode: [this.user != null ? this.user.postalCode : '', Validators.required]
    });
    this.getCoordinates();
  }

  setTime(time) {
    if (time) {
      const hours = time.split(':')[0];
      const minutes = time.split(':')[1];
      const date = <Date>this.completeData.get('date').value;
      date.setHours(hours, minutes);
    }
  }

  getCoordinates() {
    let completeAddress = this.completeData.get("address").value + ","
      + this.completeData.get("postalCode").value + ","
      + this.completeData.get("country").value;
    this.geolocationService.getCoordinatesByAddress(completeAddress).subscribe(coordinates => {
      this.coordinates = coordinates;
    });
  }

  saveMenu() {
    this.menu = Object.assign({}, this.menuDescription.value, this.addDishes.value, this.completeData.value);
    this.menu.location = [];
    this.menu.location.push(this.coordinates.longitude);
    this.menu.location.push(this.coordinates.latitude);
    this.menuService.save(this.menu).subscribe((menu) => {
      this.router.navigate(['/home']);
    });
  }
}
