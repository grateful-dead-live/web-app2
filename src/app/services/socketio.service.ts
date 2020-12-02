import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { WSS_URL} from '../config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  public socket;
  constructor() {   }


  setupSocketConnection() {

    var connectionOptions =  {
      //"force new connection" : true,
      //"reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
      //"timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
      "transports" : ['websocket'],
      //path: '/dead/socket.io',
      //secure: true
  };

    this.socket = io(WSS_URL, connectionOptions);
    //this.socket.emit('comment', 'socket comment!');
    //this.socket.on('my broadcast', (data: string) => {
    //logger(data);
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

postLike(msg) {
  this.socket.emit('postLike', msg);
} 

like() {
 return new Observable((observer) => {
     this.socket.on('like', (msg) => {
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
