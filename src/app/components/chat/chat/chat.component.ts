import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user';
import { Message } from '../../../models/message/message';
import { ChatService } from '../../../services/chat/chat.service';
import { Booking } from '../../../models/booking/booking';
import { UserService } from '../../../services/user/user.service';
import { Chat } from '../../../models/chat/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {

  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  chat: Chat;

  constructor(private chatService: ChatService, private userService: UserService) { }

  ngOnInit() {
    this.initIoConnection();
    this.user = this.userService.getUser();
    //MOCK
    this.chat = new Chat();
    this.chat._id = "5aaecb0931d7c86f5faedb88";

  }

  private initIoConnection(): void {
    this.chatService.initSocket();

    this.ioConnection = this.chatService.onMessage()
      .subscribe((message: Message) => {
        //TO-DO filter message
        console.log(message);
        if (message)
          this.messages.push(message);
      });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    this.chatService.sendMessage({
      chat: this.chat,
      from: this.user,
      message
    });
    this.messageContent = null;
  }

}
