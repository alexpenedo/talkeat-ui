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
  image: string;
  chats: Chat[];

  constructor(private userService: UserService, private chatService: ChatService) {
    this.userService.showUserEmitter.subscribe((user) => {
      console.log(user);
      this.user = user;
    });
    this.userService.showImageEmitter.subscribe((image) => {
      this.image = image;
    });
    if (this.user) {
      this.chatService.findByHostIdOrGuestId().subscribe(chats => {
        this.chats = chats;
      });
    }
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    if (this.user)
      this.image = this.userService.getPhotoUrl(this.userService.getUser()._id);
  }
  logout() {
    this.userService.logout();
  }

}
