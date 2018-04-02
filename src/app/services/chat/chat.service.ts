import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as io from 'socket.io-client';
import { Message } from './../../models/message/message';
import { UserService } from '../user/user.service';
import { Chat } from '../../models/chat/chat';
import { Booking } from '../../models/booking/booking';
import { HttpClient, HttpParams } from '@angular/common/http';
import { headers } from '../../util/util';


@Injectable()
export class ChatService {

  serverUrl: string;
  socket;
  url: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.serverUrl = environment.serverUrl;
    this.url = environment.apiUrl + 'chat';
  }

  public initSocket(): void {
    this.socket = io(this.serverUrl);
    let user = this.userService.getUser();
    this.socket.emit('online', user);
  }

  public chatsOpened(chats: Chat[]) {
    this.socket.emit('chatsOpened', chats);
  }

  public sendMessage(message: Message) {
    this.socket.emit('message', message);
  }

  public createFirstMessage(booking: Booking) {
    this.socket.emit('firstMessage', booking);
  }

  public closeChat(chat: Chat) {
    this.socket.emit('closeChat', chat);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }
  public onNewChat(): Observable<Chat> {
    return new Observable<Chat>(observer => {
      this.socket.on('newChat', (data: Chat) => observer.next(data));
    });
  }
  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  public findByHostIdOrGuestId(): Observable<Chat[]> {
    let user = this.userService.getUser();
    const params = new HttpParams().set('hostId', user._id);
    return this.http.get<Chat[]>(this.url, { headers, params });
  }
}