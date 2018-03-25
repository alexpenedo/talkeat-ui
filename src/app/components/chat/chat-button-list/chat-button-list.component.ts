import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../../services/chat/chat.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user/user';
import { Chat } from '../../../models/chat/chat';

@Component({
  selector: 'app-chat-button-list',
  templateUrl: './chat-button-list.component.html',
  styleUrls: ['./chat-button-list.component.css'],
  providers: [ChatService]
})
export class ChatButtonListComponent implements OnInit {

  @Input() user: User;
  chats: Chat[];
  openedChats: Chat[];
  constructor(private chatService: ChatService, private userService: UserService) {
    this.openedChats = [];
  }

  ngOnInit() {
    if (this.user) {
      this.chatService.findByHostIdOrGuestId().subscribe(chats => {
        this.chats = chats;
      });
    }
  }

  openChat(activeChat: Chat) {
    if (!this.openedChats.find(element => element == activeChat))
      this.openedChats.push(activeChat);
  }

  onDelete(index:number){
    this.openedChats.splice(index,1);
  }

}
