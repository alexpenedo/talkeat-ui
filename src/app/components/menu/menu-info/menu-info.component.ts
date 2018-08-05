import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {RateService} from '../../../services/rate/rate.service';
import {UtilService} from '../../../services/util/util.service';
import {User} from '../../../models/user/user';

@Component({
  selector: 'app-menu-info',
  templateUrl: './menu-info.component.html',
  styleUrls: ['./menu-info.component.css'],
  providers: [RateService],
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
  @Input() state: string;
  @Input() date: Date;
  @Input() time: string;
  @Input() guests: number;
  @Input() available: number;
  @Input() price: number;
  @Input() name: string;
  @Input() description: string;
  @Input() starters: Array<any>;
  @Input() mains: Array<any>;
  @Input() desserts: Array<any>;
  @Input() host: User;
  @Input() address: string;
  classes: string;
  visibility: string;
  average: number;

  constructor(private userService: UserService, private rateService: RateService, private utilService: UtilService) {
    this.visibility = 'hide';
  }

  ngOnInit() {
    if (this.state === 'publish' || this.state === 'booking') {
      this.classes = 'menu-info';
    } else {
      this.classes = 'menu-info animation';
    }
    if (this.state === 'show' || this.state === 'booking') {
      this.rateService.getRateAverage(this.host._id).subscribe((average: any) => {
        if (average != null) {
          this.average = average.average;
        }
      });
    }
    this.utilService.activeMenuEmitter.subscribe((menuId) => {
      if (menuId === this.id) {
        this.visibility = 'show';
        this.classes = 'menu-info animation marked';
      }
    });
    this.utilService.disableMenusEmitter.subscribe(() => {
      this.visibility = 'hide';
      this.classes = 'menu-info animation';
    });
  }

  mouseEnter() {
    if (this.state === 'show') {
      this.visibility = 'show';
    }
  }

  mouseLeave() {
    if (this.state === 'show') {
      this.visibility = 'hide';
    }
  }

}
