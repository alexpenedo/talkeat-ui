import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';
import { BookingService } from '../../../services/booking/booking.service';
import { Menu } from '../../../models/menu/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../../../models/booking/booking';
import { UserService } from '../../../services/user/user.service';
import { ChatService } from '../../../services/chat/chat.service';
import { RateService } from '../../../services/rate/rate.service';
import { Rate } from '../../../models/rate/rate';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css'],
  providers: [MenuService, BookingService, RateService]
})
export class CreateBookingComponent implements OnInit {

  menu: Menu;
  rates: Rate[];

  constructor(private menuService: MenuService,
    private userService: UserService,
    private bookingService: BookingService,
    private rateService: RateService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.chatService.initSocket();
    let self = this;
    this.route.params.subscribe(params => this.menuService.findById(params.id)
      .subscribe((menu) => {
        this.menu = menu;
        self.rateService.getRatesByHostId(this.menu.host).subscribe((rates: Rate[]) => {
          console.log(rates);
          self.rates = rates;
        });
      }));
  }

  bookMenu() {
    let booking = new Booking();
    booking.guest = this.userService.getUser();
    booking.menu = this.menu;
    booking.host = this.menu.host;
    booking.menuDate = this.menu.date;
    this.bookingService.save(booking).subscribe((booking) => {
      this.chatService.createFirstMessage(booking);
      this.router.navigate(['/home']);
    });
  }

}
