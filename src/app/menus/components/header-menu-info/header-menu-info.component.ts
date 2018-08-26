import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../common/models/user/user';

@Component({
  selector: 'app-header-menu-info',
  templateUrl: './header-menu-info.component.html',
  styleUrls: ['./header-menu-info.component.css']
})
export class HeaderMenuInfoComponent implements OnInit {

  @Input() date: Date;
  @Input() price: number;
  @Input() available: number;
  @Input() guests: number;
  @Input() name: string;
  @Input() host: User;

  constructor() {
  }

  ngOnInit() {
  }

}
