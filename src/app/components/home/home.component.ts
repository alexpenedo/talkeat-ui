import { Menu } from './../../models/menu/menu';
import { User } from './../../models/user/user';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MenuService]
})
export class HomeComponent implements OnInit {
  persons: string;
  postalCode: string;
  date: Date;
  type: string;
  menus: Menu[];

  constructor(private menuService: MenuService) {
    this.persons = '2';
    this.date = new Date();
  }
  ngOnInit() {
  }

  find() {
    this.menuService.find(this.postalCode, this.persons, this.date, this.type)
      .subscribe(menus => {
        this.menus = menus;
      });
  }
}
