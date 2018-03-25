import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user/user';
import { Message } from '../../../models/message/message';
import { ChatService } from '../../../services/chat/chat.service';
import { Booking } from '../../../models/booking/booking';
import { UserService } from '../../../services/user/user.service';
import { Chat } from '../../../models/chat/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() user: User;
  chatUser: User;
  messageContent: string;
  @Input() index: number;
  @Input() chat: Chat;
  @ViewChild('scrollMe') private chatContent: ElementRef;
  @Output() onDelete = new EventEmitter<number>();


  constructor(private chatService: ChatService, private userService: UserService) {
  }

  ngOnInit() {
    if (this.chat.host._id == this.user._id) {
      this.chatUser = this.chat.guest;
    } else {
      this.chatUser = this.chat.host;
    }
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    this.chatService.sendMessage({
      chat: this.chat,
      from: this.user._id,
      message
    });
    this.messageContent = null;
  }


  scrollToBottom(): void {
    this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
  }


  getClass(message: Message) {
    if (message.from == this.user._id)
      return "user-message message";
    else
      return "chat-message message"
  }

  getChatPosition() {
    if (this.index == 0)
      return 0;
    else
      return (this.index * 300 + 10) + "px";
  }

  close() {
    this.onDelete.emit(this.index);
  }

}
