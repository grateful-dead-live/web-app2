import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { API_URL} from '../config'

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  public socket;
  constructor() {   }
  setupSocketConnection() {
    this.socket = io(API_URL);
    //this.socket.emit('comment', 'socket comment!');
    //this.socket.on('my broadcast', (data: string) => {
    //  console.log(data);
    //});
  }

  postComment(msg){
    this.socket.emit('comment', msg);
    return this.socket.on('broadcast comment', (comment: string) => {
      return comment;
    })
  }


}
