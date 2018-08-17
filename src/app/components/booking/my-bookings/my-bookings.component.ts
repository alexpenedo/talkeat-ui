import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../../services/booking/booking.service';
import {Booking} from '../../../models/booking/booking';
import {MatTabChangeEvent} from '@angular/material';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
  providers: [BookingService],
})
export class MyBookingsComponent implements OnInit {

  bookingsFinished: Booking[];
  currentPageFinished: number;
  bookingsPending: Booking[];
  currentPagePending: number;

  constructor(private bookingService: BookingService) {
    this.currentPagePending = 0;
    this.currentPageFinished = 0;
  }

  ngOnInit() {
    this.findBookingsPending();
  }

  findBookings(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.findBookingsPending();
    } else {
      this.findBookingsFinished();
    }
  }

  onScrollPendingDown() {
    this.currentPagePending++;
    this.bookingService.findBookingsByGuestPending(this.currentPagePending).subscribe(bookings => {
      this.bookingsPending.push(...bookings);
    });
  }

  findBookingsPending() {
    this.currentPagePending = 0;
    this.bookingService.findBookingsByGuestPending(this.currentPagePending).subscribe(bookings => {
      this.bookingsPending = bookings;
    });
  }

  onScrollFinishedDown() {
    this.currentPageFinished++;
    this.bookingService.findBookingsByGuestFinished(this.currentPageFinished).subscribe(bookings => {
      this.bookingsFinished.push(...bookings);
    });
  }

  findBookingsFinished() {
    this.currentPageFinished = 0;
    this.bookingService.findBookingsByGuestFinished(this.currentPageFinished).subscribe(bookings => {
      this.bookingsFinished = bookings;
    });
  }
}
