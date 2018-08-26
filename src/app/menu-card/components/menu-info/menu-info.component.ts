import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../users/services/user/user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {RateService} from '../../../ratings/services/rate/rate.service';
import {UtilService} from '../../../common/services/util/util.service';
import {User} from '../../../common/models/user/user';
import {Router} from '@angular/router';

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
  @Input() personsSelected?: string;
  @Input() average: number;
  @Input() distance: number;
  classes: string;
  visibility: string;

  constructor(private userService: UserService, private rateService: RateService,
              private utilService: UtilService, private router: Router) {
    this.visibility = 'hide';
  }

  ngOnInit() {
    if (this.state === 'publish' || this.state === 'booking') {
      this.classes = 'menu-info';
    } else {
      this.classes = 'menu-info animation';
    }
    if (this.state === 'show' || this.state === 'booking') {
      if (this.average === undefined) {
        this.rateService.getRateAverage(this.host._id).subscribe((average: any) => {
          if (average != null) {
            this.average = average.average;
          }
        });
      }
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

  getDistance() {
    if (this.distance < 1000) {
      return `${Math.round(this.distance)}m`;
    } else if (this.distance >= 1000 && this.distance < 20000) {
      return `${Math.round(this.distance / 1000)}km`;
    } else {
      return '+20km';
    }
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

  bookMenu() {
    if (this.state === 'show') {
      this.router.navigate(['/bookings/create', this.id], {queryParams: {persons: this.personsSelected}}).catch();
    }
  }
}
