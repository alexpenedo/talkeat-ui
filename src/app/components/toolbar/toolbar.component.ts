import { UserService } from './../../services/user/user.service';
import { User } from './../../models/user/user';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { BookingService } from '../../services/booking/booking.service';
import { Booking } from '../../models/booking/booking';
import { ChatService } from '../../services/chat/chat.service';
import { Chat } from '../../models/chat/chat';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [ChatService]
})
export class ToolbarComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private chatService: ChatService) {
  }

  ngOnInit() {
    this.userService.showUserEmitter.subscribe((user) => {
      this.user = this.userService.getUser();
    });
  }
  logout() {
    this.chatService.disconnectSocket();
    this.userService.logout();
  }
}
