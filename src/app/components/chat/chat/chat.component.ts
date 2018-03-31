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
  maximized: boolean;
  windowIcon: string;
  @Input() index: number;
  @Input() chat: Chat;
  @ViewChild('scrollMe') private chatContent: ElementRef;
  @Output() onDelete = new EventEmitter<number>();
  messageSize: number;
  focused: boolean;


  constructor(private chatService: ChatService, private userService: UserService) {
    this.maximized = true;
    this.windowIcon = "keyboard_arrow_down";
    this.focused = true;
  }

  ngOnInit() {
    if (this.chat.host._id == this.user._id) {
      this.chatUser = this.chat.guest;
    } else {
      this.chatUser = this.chat.host;
    }
    this.messageSize = this.chat.messages.length;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onFocus() {
    this.focused = true;
    this.messageSize = this.chat.messages.length
  }

  onBlur() {
    this.focused = false;
  }
  getHeaderClass() {
    if ((this.messageSize != this.chat.messages.length) && (this.focused == false)) {
      return "mat-card-header blink";
    }
    else {
      this.messageSize = this.chat.messages.length;
      return "mat-card-header";
    }
  }
  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    this.chatService.sendMessage({
      chat: this.chat,
      from: this.user._id,
      message,
      date: new Date()
    });
    this.messageContent = null;
  }


  scrollToBottom(): void {
    if (this.chatContent !== undefined)
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
      return (this.index * 300 + (this.index * 10)) + "px";
  }

  close() {
    this.onDelete.emit(this.index);
  }

  toogleWindow() {
    if (this.maximized) {
      this.maximized = false;
      this.windowIcon = "keyboard_arrow_up";
    }
    else {
      this.maximized = true;
      this.windowIcon = "keyboard_arrow_down";
    }
  }
}
