import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-address-dishs-info',
  templateUrl: './address-dishs-info.component.html',
  styleUrls: ['./address-dishs-info.component.css']
})
export class AddressDishsInfoComponent implements OnInit {
  @Input() address: string;
  @Input() starters: any[];
  @Input() mains: any[];
  @Input() desserts: any[];
  @Input() description: string;

  constructor() {
  }

  ngOnInit() {
  }

}
