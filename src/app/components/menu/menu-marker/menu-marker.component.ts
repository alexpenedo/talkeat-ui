import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-menu-marker',
  templateUrl: './menu-marker.component.html',
  styleUrls: ['./menu-marker.component.css']
})
export class MenuMarkerComponent implements OnInit {

  @Input() id: string;
  @Input() publish: string;
  @Input() date: Date;
  @Input() guests: number;
  @Input() available: number;
  @Input() price: number;
  @Input() name: string;
  @Input() host: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  scroll() {
    let element: Element = document.getElementById(this.id);
    element.scrollIntoView({ block: "end", behavior: "smooth" });
  }

}
