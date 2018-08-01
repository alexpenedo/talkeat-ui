import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../../services/menu/menu.service';
import {Menu} from '../../../models/menu/menu';

@Component({
  selector: 'app-my-menus',
  templateUrl: './my-menus.component.html',
  styleUrls: ['./my-menus.component.css'],
  providers: [MenuService]
})
export class MyMenusComponent implements OnInit {
  menusFinished: Menu[];
  menusPending: Menu[];

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.findUserMenusFinished().subscribe(menus => {
      this.menusFinished = menus;
    });
    this.menuService.findUserMenusPending().subscribe(menus => {
      this.menusPending = menus;
    });
  }
}
