import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable()
export class ChatService {

  url: string;
  socket;
  constructor() {
    this.url="http://localhost:3977"
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    console.log("emito holaaaaaaaaaaaa");
    this.socket.emit('new-message', message);
  }
}