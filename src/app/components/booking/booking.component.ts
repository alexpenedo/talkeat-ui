import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';
import { BookingService } from '../../services/booking/booking.service';
import { Menu } from '../../models/menu/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../../models/booking/booking';
import { UserService } from '../../services/user/user.service';
import { ChatService } from '../../services/chat/chat.service';

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
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe(params => this.menuService.findById(params.id)
      .subscribe(menu =>
        this.menu = menu
      ));
  }

  ngOnInit() {
    this.chatService.initSocket();
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
