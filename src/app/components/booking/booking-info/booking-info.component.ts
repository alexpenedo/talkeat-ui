import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Booking } from '../../../models/booking/booking';
import { Rate } from '../../../models/rate/rate';
import { RateService } from '../../../services/rate/rate.service';


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
    ]),
  ]
})
export class BookingInfoComponent implements OnInit {

  @Input() booking: Booking;
  visibility: string;
  focus: boolean;
  comment: string;
  rate: number;


  constructor(private rateService: RateService) {
    this.focus = false;
    this.visibility = "hide";
  }

  ngOnInit() {
  }

  mouseEnter() {
    this.visibility = 'show';
  }

  mouseLeave() {
    if (!this.focus)
      this.visibility = 'hide';
  }
  onFocus() {
    this.focus = true;
  }

  saveRate() {
    this.rateService.save(new Rate(this.booking.guest, this.booking.host,
      this.comment, this.rate, this.booking)).subscribe((rate: Rate) => {
        this.booking.rate = rate;
      });
  }

}
