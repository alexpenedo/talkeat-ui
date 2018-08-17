import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../../services/menu/menu.service';
import {Menu} from '../../../models/menu/menu';
import {MatTabChangeEvent} from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-my-menus',
  templateUrl: './my-menus.component.html',
  styleUrls: ['./my-menus.component.css'],
  providers: [MenuService]
})
export class MyMenusComponent implements OnInit {
  menusFinished: Menu[];
  currentPageFinished: number;
  menusPending: Menu[];
  currentPagePending: number;

  constructor(private menuService: MenuService) {
    this.currentPagePending = 0;
    this.currentPageFinished = 0;
  }

  ngOnInit() {
    this.findMenusPending();
  }

  findMenus(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.findMenusPending();
    } else {
      this.findMenusFinished();
    }
  }

  onCancel(id: string) {
    _.remove(this.menusPending, (e) => {
      return (e._id === id);
    });
  }

  onScrollPendingDown() {
    this.currentPagePending++;
    this.menuService.findUserMenusPending(this.currentPagePending).subscribe(menus => {
      this.menusPending.push(...menus);
    });
  }

  findMenusPending() {
    this.currentPagePending = 0;
    this.menuService.findUserMenusPending(this.currentPagePending).subscribe(menus => {
      this.menusPending = menus;
    });
  }

  onScrollFinishedDown() {
    this.currentPageFinished++;
    this.menuService.findUserMenusFinished(this.currentPageFinished).subscribe(menus => {
      this.menusFinished.push(...menus);
    });
  }

  findMenusFinished() {
    this.currentPageFinished = 0;
    this.menuService.findUserMenusFinished(this.currentPageFinished).subscribe(menus => {
      this.menusFinished = menus;
    });
  }
}
