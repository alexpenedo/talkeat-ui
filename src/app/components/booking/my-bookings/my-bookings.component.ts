import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking/booking.service';
import { Booking } from '../../../models/booking/booking';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
  providers: [BookingService],
})
export class MyBookingsComponent implements OnInit {

  bookings: Booking[];

  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
    this.bookingService.findBookingsByGuest().subscribe((bookings: Booking[]) => {
      this.bookings = bookings;
    });
  }
}
