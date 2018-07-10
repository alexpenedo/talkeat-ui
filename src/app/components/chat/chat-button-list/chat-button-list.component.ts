import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat/chat.service';
import {User} from '../../../models/user/user';
import {Chat} from '../../../models/chat/chat';
import {Message} from '../../../models/message/message';

@Component({
  selector: 'app-chat-button-list',
  templateUrl: './chat-button-list.component.html',
  styleUrls: ['./chat-button-list.component.css']
})
export class ChatButtonListComponent implements OnInit {

  @Input() user: User;
  chats: Chat[];
  openedChats: Chat[];

  constructor(private chatService: ChatService) {
    this.openedChats = [];
  }

  ngOnInit() {
    if (this.user) {
      this.getChats();
    }
    this.chatService.initSocket();
    this.chatService.onNewChat()
      .subscribe((chat: Chat) => {
        chat.notRead = 1;
        if (this.chats === undefined) {
          this.chats = [];
        }
        this.chats.push(chat);
      });
    this.chatService.onMessage()
      .subscribe((message: Message) => {
        const chat: Chat = this.chats.find((chatElem) => {
          return chatElem._id === message.chat._id;
        });
        chat.messages = message.chat.messages;
        if (!this.openedChats.find(element => element === chat)) {
          chat.notRead++;
        }
      });
  }

  openChat(activeChat: Chat) {
    if (!this.openedChats.find(element => element === activeChat)) {
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
      const messages: Message[] = chat.messages;
      const isHost = (chat.host._id === this.user._id);
      messages.forEach(message => {
        const messageDate = new Date(message.date).getTime();
        const hostLastConnection = new Date(chat.hostLastConnection).getTime();
        const guestLastConnection = new Date(chat.guestLastConnection).getTime();
        if (isHost) {
          if (messageDate >= hostLastConnection) {
            notRead++;
          }
        } else {
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
