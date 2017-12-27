import { MenuService } from './../../services/menu/menu.service';
import { dishValidator } from './validators/dishValidator';
import { Menu } from './../../models/menu/menu';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../../models/user/user';

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

  constructor(private menuService: MenuService, private userService: UserService, private formBuilder: FormBuilder) {
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
  }

  setTime(time) {
    if (time) {
      const hours = time.split(':')[0];
      const minutes = time.split(':')[1];
      const date = <Date>this.completeData.get('date').value;
      date.setHours(hours);
      date.setMinutes(minutes);
    }
  }

  saveMenu() {
    this.menu = Object.assign({}, this.menuDescription.value, this.addDishes.value, this.completeData.value);
    this.menu.host = this.user;
    this.menuService.save(this.menu);
  }

}
