import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Menu} from '../../../models/menu/menu';
import {MenuService} from '../../../services/menu/menu.service';
import {Booking} from '../../../models/booking/booking';
import {BookingService} from '../../../services/booking/booking.service';
import * as _ from 'lodash';
import {RateType} from '../../../services/util/rate-type.enum';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {ChatService} from '../../../services/chat/chat.service';
import {Notification} from '../../../services/util/notification.enum';


@Component({
  selector: 'app-host-menu-info',
  templateUrl: './host-menu-info.component.html',
  styleUrls: ['./host-menu-info.component.css'],
  providers: [MenuService, BookingService],
})
export class HostMenuInfoComponent implements OnInit {

  @Input() menu: Menu;
  rate: number;
  bookings: Booking[];
  @Output() cancelEmitter = new EventEmitter<string>();

  constructor(private menuService: MenuService,
              private bookingService: BookingService,
              private chatService: ChatService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.menuService.findBookingsByMenuId(this.menu._id).subscribe(bookings => {
      this.bookings = bookings;
      this.bookings.forEach((booking) => {
        this.bookingService.getBookingRates(booking._id).subscribe((rates) => {
          booking.hostRate = _.find(rates, {type: RateType.HOST});
          booking.guestRate = _.find(rates, {type: RateType.GUEST});
        });
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        message: 'Are you sure to cancel this menu? We will notify your guests.',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelMenu();
      }
    });
  }

  cancelMenu() {
    this.menuService.cancelMenu(this.menu._id).subscribe(() => {
      this.chatService.sendNotification(this.menu, Notification.CANCEL);
      this.cancelEmitter.emit(this.menu._id);
    });
  }

  isPast(date: Date) {
    const time = new Date(date).getTime();
    if (time < new Date().getTime()) {
      return true;
    }
    return false;
  }
}

