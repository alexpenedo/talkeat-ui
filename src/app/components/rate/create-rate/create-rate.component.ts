import {Component, OnInit} from '@angular/core';
import {Menu} from '../../../models/menu/menu';
import {Rate} from '../../../models/rate/rate';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuService} from '../../../services/menu/menu.service';
import {UserService} from '../../../services/user/user.service';
import {BookingService} from '../../../services/booking/booking.service';
import {RateService} from '../../../services/rate/rate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Booking} from '../../../models/booking/booking';
import {User} from '../../../models/user/user';
import {RateType} from '../../../services/util/rate-type.enum';

@Component({
  selector: 'app-create-rate',
  templateUrl: './create-rate.component.html',
  styleUrls: ['./create-rate.component.css'],
  providers: [MenuService, BookingService, UserService, RateService]
})
export class CreateRateComponent implements OnInit {

  booking: Booking;
  menu: Menu;
  rates: Rate[];
  rate: FormGroup;
  comments: FormGroup;
  ratingHost: boolean;
  guest: User;

  constructor(private menuService: MenuService,
              private userService: UserService,
              private bookingService: BookingService,
              private rateService: RateService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    const self = this;
    this.rate = this.formBuilder.group({
      rate: ['', Validators.required],
    });
    this.comments = this.formBuilder.group({
      comments: [''],
    });
    this.route.params.subscribe(params => {
      if (params.guest) {
        this.ratingHost = false;
        this.userService.findById(params.guest).subscribe((user: User) => {
          this.guest = user;
        });
      } else {
        this.ratingHost = true;
      }
      this.bookingService.findById(params.id)
        .subscribe((booking) => {
          this.booking = booking;
          this.menu = booking.menu;
          if (this.ratingHost) {
            self.rateService.getRatesByHostId(this.booking.host._id).subscribe((rates: Rate[]) => {
              self.rates = rates;
            });
          } else {
            self.rateService.getRatesByGuestId(this.booking.host._id).subscribe((rates: Rate[]) => {
              self.rates = rates;
            });
          }
        });
    });
  }

  rateMenu() {
    const rateType = this.ratingHost ? RateType.HOST : RateType.GUEST;
    this.rateService.save(new Rate(this.booking.guest, this.booking.host,
      this.comments.get('comments').value, this.rate.get('rate').value, this.booking, rateType))
      .subscribe((rate: Rate) => {
        if (this.ratingHost) {
          this.router.navigate(['/my-bookings']).catch();
        } else {
          this.router.navigate(['/my-menus']).catch();
        }
      });
  }
}
