import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-menu-info',
  templateUrl: './menu-info.component.html',
  styleUrls: ['./menu-info.component.css'],
  animations: [
    trigger('visibility', [
      state('show', style({
        opacity: 1,
      })),
      state('hide', style({
        opacity: 0,
      })),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class MenuInfoComponent implements OnInit {

  @Input() id: string;
  @Input() publish: string;
  @Input() date: Date;
  @Input() guests: number;
  @Input() available: number;
  @Input() price: number;
  @Input() name: string;
  @Input() description: string;
  @Input() starters: Array<any>;
  @Input() mains: Array<any>;
  @Input() desserts: Array<any>;
  @Input() host: string;
  @Input() address: string;
  image: string;
  classes: string;
  visibility:string;

  constructor(private userService: UserService) {
    this.visibility = 'hide';
  }

  ngOnInit() {
    this.image = this.userService.getPhotoUrl(this.host);
    if (this.publish == "true") {
      this.classes = "menu-info";
    }
    else {
      this.classes = "menu-info animation";
    }
  }
  mouseEnter() {
    if (this.publish == "false") {
      this.visibility = 'show';
    }
  }
  mouseLeave() {
    if (this.publish == "false") {
      this.visibility = 'hide';
    }
  }

}
