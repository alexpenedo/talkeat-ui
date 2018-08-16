import {Component, Input, OnInit} from '@angular/core';
import {Rate} from '../../../models/rate/rate';
import {RateType} from '../../../services/util/rate-type.enum';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  @Input() rate: Rate;
  hostRate: boolean;

  constructor() {
  }

  ngOnInit() {
    if (this.rate.type === RateType.GUEST) {
      this.hostRate = false;
    } else {
      this.hostRate = true;
    }
  }

}
