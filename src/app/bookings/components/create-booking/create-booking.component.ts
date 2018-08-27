import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {MenuService} from '../../../menus/services/menu/menu.service';
import {BookingService} from '../../services/booking/booking.service';
import {Menu} from '../../../common/models/menu/menu';
import {ActivatedRoute, Router} from '@angular/router';
import {Booking} from '../../../common/models/booking/booking';
import {UserService} from '../../../users/services/user/user.service';
import {ChatService} from '../../../chat/services/chat/chat.service';
import {RateService} from '../../../ratings/services/rate/rate.service';
import {Rate} from '../../../common/models/rate/rate';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {query} from '@angular/animations';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css'],
  providers: [MenuService, BookingService, RateService]
})
export class CreateBookingComponent implements OnInit {
  menu: Menu;
  rates: Rate[];
  available: number[] = [1, 2, 3];
  persons: FormGroup;
  comments: FormGroup;

  constructor(private menuService: MenuService,
              private userService: UserService,
              private bookingService: BookingService,
              private rateService: RateService,
              private chatService: ChatService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {

  }

  ngOnInit() {
    this.chatService.initSocket();
    const self = this;
    this.persons = this.formBuilder.group({
      persons: [1, Validators.required],
    });
    this.comments = this.formBuilder.group({
      comments: [''],
    });
    this.route.params.subscribe(params => {
      this.menuService.findById(params.menuId)
        .subscribe((menu) => {
          this.available = Array(menu.available).fill(1).map((x, i) => i + 1);
          this.menu = menu;
          this.route.queryParams.subscribe(queryParams => {
            this.persons.get('persons').setValue(+queryParams.persons);
          });
          self.rateService.getRatesByHostId(this.menu.host._id).subscribe((rates: Rate[]) => {
            self.rates = rates;
          });
        });
    });
  }

  bookMenu() {
    const bookingToSave = new Booking(this.userService.getUser(), this.menu,
      +this.persons.get('persons').value, this.comments.get('comments').value);
    this.bookingService.save(bookingToSave).subscribe((booking: Booking) => {
      this.chatService.createFirstMessage(booking);
      this.router.navigate(['/home']).catch();
    });
  }

}
