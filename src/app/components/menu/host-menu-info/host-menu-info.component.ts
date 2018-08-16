import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Menu} from '../../../models/menu/menu';
import {MenuService} from '../../../services/menu/menu.service';
import {Booking} from '../../../models/booking/booking';
import {BookingService} from '../../../services/booking/booking.service';
import * as _ from 'lodash';
import {RateType} from '../../../services/util/rate-type.enum';


@Component({
  selector: 'app-host-menu-info',
  templateUrl: './host-menu-info.component.html',
  styleUrls: ['./host-menu-info.component.css'],
  providers: [MenuService, BookingService],
})
export class HostMenuInfoComponent implements OnInit {

  @Input() menu: Menu;
  rate: number;
  bookings: Booking[];


  constructor(private menuService: MenuService, private bookingService: BookingService) {
  }

  ngOnInit() {
    this.menuService.findBookingsByMenuId(this.menu._id).subscribe(bookings => {
      this.bookings = bookings;
      this.bookings.forEach((booking) => {
        this.bookingService.getBookingRates(booking._id).subscribe((rates) => {
          booking.hostRate = _.find(rates, {type: RateType.HOST});
          booking.guestRate = _.find(rates, {type: RateType.GUEST});
        });
      });
    });
  }

  isCanceled(booking: Booking) {
    if (booking.canceled) {
      return true;
    }
    if (!booking.confirmed && this.isPast(booking.menuDate)) {
      return true;
    }
    return false;
  }

  isPast(date: Date) {
    const time = new Date(date).getTime();
    if (time < new Date().getTime()) {
      return true;
    }
    return false;
  }
}

