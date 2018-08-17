import {Component, Input, OnInit} from '@angular/core';
import {Booking} from '../../../models/booking/booking';
import {Rate} from '../../../models/rate/rate';
import {BookingService} from '../../../services/booking/booking.service';
import * as _ from 'lodash';
import {RateType} from '../../../services/util/rate-type.enum';


@Component({
  selector: 'app-booking-info',
  templateUrl: './booking-info.component.html',
  styleUrls: ['./booking-info.component.css'],
  providers: [BookingService]
})
export class BookingInfoComponent implements OnInit {

  @Input() booking: Booking;
  hostRate: Rate;
  guestRate: Rate;

  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
    this.bookingService.getBookingRates(this.booking._id).subscribe((rates: Rate[]) => {
      this.hostRate = _.find(rates, {type: RateType.HOST});
      this.guestRate = _.find(rates, {type: RateType.GUEST});
    });
  }

  isPast(date: Date) {
    const time = new Date(date).getTime();
    if (time < new Date().getTime()) {
      return true;
    }
    return false;
  }
}
