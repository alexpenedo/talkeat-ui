import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {Menu} from '../../../models/menu/menu';
import {MenuService} from '../../../services/menu/menu.service';
import {Booking} from '../../../models/booking/booking';


@Component({
  selector: 'app-host-menu-info',
  templateUrl: './host-menu-info.component.html',
  styleUrls: ['./host-menu-info.component.css'],
  providers: [MenuService],
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
export class HostMenuInfoComponent implements OnInit {

  @Input() menu: Menu;
  @Input() state: string;
  visibility: string;
  comment: string;
  rate: number;
  classes: string;
  bookings: Booking[];


  constructor(private menuService: MenuService, private router: Router) {
    this.visibility = 'hide';
  }

  ngOnInit() {
    this.menuService.findBookingsByMenuId(this.menu._id).subscribe(bookings => {
      this.bookings = bookings;
    });

    if (this.state === 'show') {
      this.classes = 'animation';
    }
  }

  mouseEnter() {
    this.visibility = 'show';
  }

  mouseLeave() {
    this.visibility = 'hide';
  }

}
