import {MenuService} from '../../../services/menu/menu.service';
import {dishValidator} from '../validators/dishValidator';
import {Menu} from '../../../models/menu/menu';
import {UserService} from '../../../services/user/user.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user/user';
import {GeolocationService} from '../../../services/geolocation/geolocation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Coordinates} from '../../../models/coordinates/coordinates';
import {AddDishesComponent} from '../add-dishes/add-dishes.component';
import {DatePipe} from '@angular/common';
import {ChatService} from '../../../services/chat/chat.service';
import {Notification} from '../../../services/util/notification.enum';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-edit-menu.component.html',
  styleUrls: ['./create-edit-menu.component.css'],
  providers: [MenuService, DatePipe]
})
export class CreateEditMenuComponent implements OnInit {
  user: User;
  menu: Menu;
  date: Date;
  menuDescription: FormGroup;
  addDishes: FormGroup;
  completeData: FormGroup;
  coordinates: Coordinates;
  @ViewChild('starters')
  starters: AddDishesComponent;
  @ViewChild('mains')
  mains: AddDishesComponent;
  @ViewChild('desserts')
  desserts: AddDishesComponent;

  constructor(private menuService: MenuService, private userService: UserService, private chatService: ChatService,
              private geolocationService: GeolocationService, private formBuilder: FormBuilder,
              private router: Router, private route: ActivatedRoute, private  datePipe: DatePipe) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.initializeForm();
    this.getCoordinates();
    this.fillForm();
  }

  private fillForm() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.menuService.findById(params.id)
          .subscribe((menu) => {
            this.menu = menu;
            this.menuDescription.get('name').setValue(this.menu.name);
            this.menuDescription.get('description').setValue(this.menu.description);
            this.menu.starters.forEach(dishComponent => {
              this.starters.addItem(dishComponent.name);
            });
            this.menu.mains.forEach(dishComponent => {
              this.mains.addItem(dishComponent.name);
            });
            this.menu.desserts.forEach(dishComponent => {
              this.desserts.addItem(dishComponent.name);
            });
            this.completeData.get('guests').setValue(menu.guests.toString());
            this.completeData.get('price').setValue(menu.price.toFixed(2));
            this.completeData.get('date').setValue(menu.date);
            this.completeData.get('time').setValue(this.datePipe.transform(menu.date, 'HH:mm').toString());
            this.completeData.get('country').setValue(menu.country);
            this.completeData.get('address').setValue(menu.address);
            this.completeData.get('postalCode').setValue(menu.postalCode);
            this.completeData.get('country').disable();
            this.completeData.get('address').disable();
            this.completeData.get('postalCode').disable();
            this.date = menu.date;
          });
      }
    });
  }

  private initializeForm() {
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
      {validator: dishValidator}
    );
    this.completeData = this.formBuilder.group({
      guests: [2, Validators.required],
      price: ['', Validators.required],
      date: [new Date(), Validators.required],
      time: ['', Validators.required],
      address: [this.user != null ? this.user.address : '', Validators.required],
      country: [this.user != null ? this.user.country : '', Validators.required],
      postalCode: [this.user != null ? this.user.postalCode : '', Validators.required]
    });
  }

  setTime(time) {
    if (time) {
      const hours = time.split(':')[0];
      const minutes = time.split(':')[1];
      this.date = new Date(this.completeData.get('date').value);
      this.date.setHours(+hours, +minutes);
    }
  }

  getCoordinates() {
    const completeAddress = this.completeData.get('address').value + ','
      + this.completeData.get('postalCode').value + ','
      + this.completeData.get('country').value;
    this.geolocationService.getCoordinatesByAddress(completeAddress).subscribe(coordinates => {
      this.coordinates = coordinates;
    });
  }

  saveMenu() {
    this.menu = new Menu();
    Object.assign(this.menu, this.menuDescription.value, this.addDishes.value, this.completeData.value);
    this.menu.date = this.date;
    this.menu.guests = parseInt(this.completeData.get('guests').value, 10);
    this.menu.location = [];
    this.menu.location.push(this.coordinates.longitude);
    this.menu.location.push(this.coordinates.latitude);
    this.menuService.save(this.menu).subscribe(() => {
      this.router.navigate(['/home']).catch();
    });
  }

  updateMenu() {
    this.menu = Object.assign(this.menu, this.menuDescription.value, this.addDishes.value, this.completeData.value);
    this.menu.date = this.date;
    this.menu.guests = parseInt(this.completeData.get('guests').value, 10);
    this.menuService.update(this.menu).subscribe((menu) => {
      this.chatService.sendNotification(menu, Notification.UPDATE);
      this.router.navigate(['/home']).catch();
    });
  }
}
