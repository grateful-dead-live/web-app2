import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { API_URL} from '../config';
import { Observable } from 'rxjs';

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


  postAddComment(msg){
    this.socket.emit('postAddComment', msg);
  }

  newComment() {
    return new Observable((observer) => {
        this.socket.on('addcomment', (msg) => {
          observer.next(msg);
          //observer.complete();
        });
    });
  }

 postDeleteComment(msg) {
   this.socket.emit('postDeleteComment', msg);
 } 

 deleteComment() {
  return new Observable((observer) => {
      this.socket.on('deletecomment', (msg) => {
        observer.next(msg);
        //observer.complete();
      });
  });
}



  joinRoom(room){
    this.socket.emit('joinroom', room);
  }

  leaveRoom(room){
    this.socket.emit('leaveroom', room);
  }


}
