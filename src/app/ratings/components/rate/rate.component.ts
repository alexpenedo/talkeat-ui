import {Component, Input, OnInit} from '@angular/core';
import {Rate} from '../../../common/models/rate/rate';
import {RateType} from '../../../common/enums/rate-type.enum';

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
    this.hostRate = this.rate.type !== RateType.GUEST;
  }
}
