import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Booking } from '../../../models/booking/booking';
import { Rate } from '../../../models/rate/rate';
import { RateService } from '../../../services/rate/rate.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-booking-info',
  templateUrl: './booking-info.component.html',
  styleUrls: ['./booking-info.component.css'],
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
export class BookingInfoComponent implements OnInit {

  @Input() booking: Booking;
  @Input() state: string;
  visibility: string;
  comment: string;
  rate: number;
  classes: string;


  constructor(private rateService: RateService, private router: Router) {
    this.visibility = "hide";
  }

  ngOnInit() {
    if (!this.booking.rate && this.state === "show")
      this.classes = "animation";
  }

  mouseEnter() {
    this.visibility = 'show';
  }

  mouseLeave() {
    this.visibility = 'hide';
  }

  saveRate() {
    this.rateService.save(new Rate(this.booking.guest, this.booking.host,
      this.comment, this.rate, this.booking)).subscribe((rate: Rate) => {
        this.router.navigate(['/my-bookings']);
      });
  }

}
