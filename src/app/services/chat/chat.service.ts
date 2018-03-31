import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as io from 'socket.io-client';
import { Message } from './../../models/message/message';
import { UserService } from '../user/user.service';
import { HttpParams } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Chat } from '../../models/chat/chat';
import { Booking } from '../../models/booking/booking';


@Injectable()
export class ChatService {

  serverUrl: string;
  socket;
  url: string;
  requestOptions: RequestOptions;

  constructor(private http: Http, private userService: UserService) {
    this.serverUrl = environment.serverUrl;
    this.url = environment.apiUrl + 'chat';
    const headers: Headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.requestOptions = new RequestOptions({ headers: headers, params: new HttpParams() });
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
    const params = new HttpParams();
    this.requestOptions.params.set('hostId', user._id);
    this.requestOptions.params.set('guestId', user._id);
    return this.http.get(this.url, this.requestOptions).map((response) => {
      return <Chat[]>response.json();
    });
  }
}