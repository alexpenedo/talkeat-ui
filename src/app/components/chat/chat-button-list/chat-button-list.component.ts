import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../../services/chat/chat.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user/user';
import { Chat } from '../../../models/chat/chat';
import { Message } from '../../../models/message/message';

@Component({
  selector: 'app-chat-button-list',
  templateUrl: './chat-button-list.component.html',
  styleUrls: ['./chat-button-list.component.css']
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
      this.getChats();
    }
    this.chatService.initSocket();
    this.chatService.onNewChat()
      .subscribe((chat: Chat) => {
        chat.notRead=1;
        if (this.chats===undefined){
          this.chats=[];
        }
        this.chats.push(chat);
      });
    this.chatService.onMessage()
      .subscribe((message: Message) => {
        let chat: Chat = this.chats.find((chat) => {
          return chat._id == message.chat._id;
        });
        chat.messages = message.chat.messages;
        if (!this.openedChats.find(element => element == chat))
          chat.notRead++;
      });
  }

  openChat(activeChat: Chat) {
    if (!this.openedChats.find(element => element == activeChat)) {
      this.openedChats.push(activeChat);
      this.chatService.chatsOpened(this.openedChats);
      activeChat.notRead = 0;
    }

  }

  onDelete(index: number) {
    this.openedChats.splice(index, 1);
  }


  getChats() {
    this.chatService.findByHostIdOrGuestId().subscribe(chats => {
      this.chats = chats;
      this.setChatsNotRead();
    });
  }
  setChatsNotRead() {
    this.chats.forEach(chat => {
      let notRead = 0;
      let messages: Message[] = chat.messages;
      let isHost = (chat.host._id == this.user._id);
      messages.forEach(message => {
        let messageDate = new Date(message.date).getTime();
        let hostLastConnection = new Date(chat.hostLastConnection).getTime();
        let guestLastConnection = new Date(chat.guestLastConnection).getTime();
        if (isHost) {
          if (messageDate >= hostLastConnection) {
            notRead++;
          }
        }
        else {
          if (messageDate >= guestLastConnection) {
            notRead++;
          }
        }
      });
      chat.notRead = notRead;
    });
  }

  getTotalNotRead(): number {
    let notRead = 0;
    if (this.chats !== undefined) {
      this.chats.forEach(chat => {
        notRead += chat.notRead;
      });
      return notRead;
    }
  }

}
