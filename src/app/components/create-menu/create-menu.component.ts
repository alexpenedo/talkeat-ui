import { dishValidator } from './validators/dishValidator';
import { Menu } from './../../models/menu/menu';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {
  user: User;
  menu: Menu;
  menuDescription: FormGroup;
  addDishes: FormGroup;
  completeData: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.menu = new Menu();
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    // this.menu.address = this.user.address;
    // this.menu.country = this.user.country;
    // this.menu.postalCode = this.user.postalCode;
    this.menu.date = new Date();
    this.menuDescription = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.addDishes = this.formBuilder.group({
      starters: this.formBuilder.group({
        array: this.formBuilder.array([])
      }),
      mains: this.formBuilder.group({
        array: this.formBuilder.array([])
      }),
      desserts: this.formBuilder.group({
        array: this.formBuilder.array([])
      }),
    },
      { validator: dishValidator }
    );
    this.completeData = this.formBuilder.group({
      guests: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  setTime(time) {
    if (time) {
      const hours = time.split(':')[0];
      const minutes = time.split(':')[1];
      this.menu.date.setHours(hours);
      this.menu.date.setMinutes(minutes);
    }
  }

  saveMenu() {
    console.log(this.menuDescription);
    console.log(this.addDishes);
  }

}
