import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';
import { BookingService } from '../../services/booking/booking.service';
import { Menu } from '../../models/menu/menu';
import { ActivatedRoute } from '@angular/router';
import { Booking } from '../../models/booking/booking';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [MenuService, BookingService]
})
export class BookingComponent implements OnInit {

  menu: Menu;

  constructor(private menuService: MenuService,
    private userService: UserService,
    private bookingService: BookingService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.menuService.findById(params.id)
      .subscribe(menu =>
        this.menu = menu
      ));
  }

  ngOnInit() {
  }

  bookMenu() {
    let booking = new Booking();
    booking.guest = this.userService.getUser();
    booking.menu = this.menu;
    this.bookingService.save(booking);
  }

}
