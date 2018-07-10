import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../../services/booking/booking.service';
import {ActivatedRoute} from '@angular/router';
import {Booking} from '../../../models/booking/booking';
import {Rate} from '../../../models/rate/rate';
import {RateService} from '../../../services/rate/rate.service';

@Component({
  selector: 'app-booking-rate',
  templateUrl: './booking-rate.component.html',
  styleUrls: ['./booking-rate.component.css'],
  providers: [BookingService, RateService]
})
export class BookingRateComponent implements OnInit {
  booking: Booking;
  rates: Rate[];

  constructor(private bookingService: BookingService, private rateService: RateService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const self = this;
    this.route.params.subscribe(params => this.bookingService.findById(params.id)
      .subscribe((booking) => {
        this.booking = booking;
        self.rateService.getRatesByHostId(this.booking.host._id).subscribe((rates: Rate[]) => {
          self.rates = rates;
        });
      }));
  }

}
