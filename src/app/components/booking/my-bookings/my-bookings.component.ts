import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../../services/booking/booking.service';
import {Booking} from '../../../models/booking/booking';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
  providers: [BookingService],
})
export class MyBookingsComponent implements OnInit {

  bookingsFinished: Booking[];
  bookingsPending: Booking[];
  date: Date;

  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
    this.date = new Date();
    this.bookingService.findBookingsByGuestFinished().subscribe((bookings: Booking[]) => {
      this.bookingsFinished = bookings;
    });
    this.bookingService.findBookingsByGuestPending().subscribe((bookings: Booking[]) => {
      this.bookingsPending = bookings;
    });
  }
}
