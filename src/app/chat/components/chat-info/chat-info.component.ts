import {Component, Input, OnInit} from '@angular/core';
import {RateService} from '../../../ratings/services/rate/rate.service';
import {Rate} from '../../../common/models/rate/rate';
import {Booking} from '../../../common/models/booking/booking';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.css'],
  providers: [RateService]
})
export class ChatInfoComponent implements OnInit {

  @Input() booking: Booking;
  rates: Rate[];

  constructor(private rateService: RateService) {
  }

  ngOnInit() {
    this.rateService.getRatesByHostId(this.booking.host._id).subscribe((rates: Rate[]) => {
      this.rates = rates;
    });
  }

}
