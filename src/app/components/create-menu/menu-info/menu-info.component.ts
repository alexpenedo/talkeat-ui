import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-menu-info',
  templateUrl: './menu-info.component.html',
  styleUrls: ['./menu-info.component.css']
})
export class MenuInfoComponent implements OnInit {

  @Input() date: Date;
  @Input() guests: number;
  @Input() price: number;
  @Input() name: string;
  @Input() description: string;
  @Input() starters: Array<any>;
  @Input() mains: Array<any>;
  @Input() desserts: Array<any>;
  @Input() host: string;
  image: string;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.image = this.userService.getPhotoUrl(this.host);
  }

}
