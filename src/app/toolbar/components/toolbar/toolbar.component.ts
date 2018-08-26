import {UserService} from '../../../users/services/user/user.service';
import {User} from '../../../common/models/user/user';
import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../chat/services/chat/chat.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: []
})
export class ToolbarComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private chatService: ChatService) {
  }

  ngOnInit() {
    this.userService.showUserEmitter.subscribe(() => {
      this.user = this.userService.getUser();
    });
  }

  logout() {
    this.chatService.closeOpenedChats();
    this.userService.logout();
  }
}
