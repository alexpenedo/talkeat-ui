import {Injectable} from '@angular/core';
import {environment} from './../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {Message} from './../../models/message/message';
import {UserService} from '../user/user.service';
import {Chat} from '../../models/chat/chat';
import {Booking} from '../../models/booking/booking';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class ChatService {

  serverUrl: string;
  socket;
  url: string;
  private _closeOpenedChats: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  closeOpenedChatsEmitter: Observable<string> = this._closeOpenedChats.asObservable();


  constructor(private http: HttpClient, private userService: UserService) {
    this.serverUrl = environment.serverUrl;
    this.url = environment.apiUrl + 'chat';
  }

  public initSocket(): void {
    this.socket = io(this.serverUrl);
    const user = this.userService.getUser();
    this.socket.emit('online', user);
  }

  public closeOpenedChats() {
    this._closeOpenedChats.next(null);
  }

  // public chatsOpened(chats: Chat[]) {
  //   this.socket.emit('chatsOpened', chats);
  // }

  public sendMessage(message: Message) {
    this.socket.emit('message', message);
  }

  public createFirstMessage(booking: Booking) {
    this.socket.emit('firstMessage', booking);
  }

  public closeChat(chat: Chat) {
    this.socket.emit('closeChat', chat);
  }
  public minimizeChat(chat: Chat) {
    this.socket.emit('minimizeChat', chat);
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
    const user = this.userService.getUser();
    const params = new HttpParams().set('hostId', user._id)
      .set('guestId', user._id);

    return this.http.get<Chat[]>(this.url, {params});
  }
}
