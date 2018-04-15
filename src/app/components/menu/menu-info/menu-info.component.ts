import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RateService } from '../../../services/rate/rate.service';

@Component({
  selector: 'app-menu-info',
  templateUrl: './menu-info.component.html',
  styleUrls: ['./menu-info.component.css'],
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
export class MenuInfoComponent implements OnInit {

  @Input() id: string;
  @Input() state: string;
  @Input() date: Date;
  @Input() time: string;
  @Input() guests: number;
  @Input() available: number;
  @Input() price: number;
  @Input() name: string;
  @Input() description: string;
  @Input() starters: Array<any>;
  @Input() mains: Array<any>;
  @Input() desserts: Array<any>;
  @Input() host: string;
  @Input() address: string;
  classes: string;
  visibility: string;
  average: number;

  constructor(private userService: UserService, private rateService: RateService) {
    this.visibility = 'hide';
  }

  ngOnInit() {
    if (this.state == "publish" || this.state == "booking") {
      this.classes = "menu-info";
    }
    else {
      this.rateService.getRateAverage(this.host).subscribe((average: any) => {
        this.average = average.average;
      });
      this.classes = "menu-info animation";
    }
  }
  mouseEnter() {
    if (this.state == "show") {
      this.visibility = 'show';
    }
  }
  mouseLeave() {
    if (this.state == "show") {
      this.visibility = 'hide';
    }
  }

}
