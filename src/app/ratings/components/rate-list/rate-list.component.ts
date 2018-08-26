import {Component, Input, OnInit} from '@angular/core';
import {Rate} from '../../../common/models/rate/rate';

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.css']
})
export class RateListComponent implements OnInit {
  @Input() rates: Rate[];

  constructor() {
  }

  ngOnInit() {
  }

}
