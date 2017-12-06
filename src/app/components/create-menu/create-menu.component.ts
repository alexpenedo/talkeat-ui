import { Menu } from './../../models/menu/menu';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {
  user: User;
  menu: Menu;

  constructor(private userService: UserService) {
    this.menu = new Menu();
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.menu.address = this.user.address;
    this.menu.country = this.user.country;
    this.menu.postalCode = this.user.postalCode;
    this.menu.starters = [];
    this.menu.mains = [];
    this.menu.desserts = [];
    this.menu.date = new Date();
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
    console.log(this.menu);
  }

}
