import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { CommentPayload } from '../services/types';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';
import { SocketioService } from '../services/socketio.service';
import { SOCKETIO } from '../config';
import { logger } from '../globals';


@Component({
  selector: 'gd-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {
  constructor(private data: DataService, private router: Router,  private dialog: DialogService, private changeDetectorRef: ChangeDetectorRef,
      private socket: SocketioService ) { }

  @Input() title: string;
  @Input() userName: string;
  @Input() heading = 'comments';
  //headerImage  =  '../assets/logo.png';
  showErrorDiv:  boolean;
  errorMsg = 'This is an error';
  inputMaxLength = 100;
  placeholderText=  'Write a comment!';
  @Input() currentUserId: string;
  allComments:  Array<CommentPayload>;
  socketIo = SOCKETIO;


  ngOnInit() { 
    if (SOCKETIO) {
      this.socket.newComment().subscribe((payload: any) => {
        logger('add comment');
        this.allComments.push(payload);
        }, err => {
          logger(err);
      });

      this.socket.deleteComment().subscribe((msgId: any) => {
        const i = this.allComments.map(x => x.msgId).indexOf(msgId);
        if (i > -1) {
          this.allComments.splice(i, 1);
          this.changeDetectorRef.detectChanges();
        }
      }, err => {
        logger(err);
      });
    }
  }

  refresh() {
    this.getComments();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'title': {
            this.refresh();
          }
        }
      }
    }
  }

  async sendMessage(msgPayload:  string) {
      // Constructing a desired object of type CommentPayload to be added to allComments
      if (msgPayload){
        //var msgId = Math.floor(1000000000000000 + Math.random() * 9000000000000000);
        var msgId = this.makeid()
        var timestamp = new Date;
        const  payload  = {
            msgId:  msgId,
            msg:  msgPayload,
            timestamp:  timestamp.getTime().toString(),
            userName:  this.userName,
            userId: this.currentUserId
        };
        try {
          await this.addComment(payload);
      } catch (e) {
          console.error(e);
      } 
      if (await this.checkComment(msgId)){
        payload.timestamp = this.formatTime(timestamp);
        this.allComments.push(payload);
        //this.socket.postComment({ room: this.router.url, comment: msgPayload });
        //this.socket.postComment(this.router.url);
        if (SOCKETIO) this.socket.postAddComment({ room: this.router.url, payload: payload });
      }
    }
  }
      
  onKeyUp(msgPayload:  string) {
      //logger(msgPayload);  // doesn't work
  }

  async getComments(){
    var res =  await this.data.getComments(this.router.url);
    if (res != []){
      res.sort(function(a, b) { return a.timestamp - b.timestamp });
      for (var i in res) {
        res[i].timestamp = this.formatTime(new Date(Number(res[i].timestamp)));
      }
      this.allComments = res;
    } else {
      this.allComments = [];
    }
    this.changeDetectorRef.detectChanges();
  }

  async addComment(p){
    //let sp = this.socket.postComment('test');
    await this.data.addComment(p, this.router.url, this.currentUserId, this.title);
  }

  async checkComment(msgId) {
    //logger(msgId)
    var b = Boolean(Number(await this.data.checkComment(msgId)));
    //logger(b);
    return b
  }

  formatTime(d) {
    function z(n){return (n<10?'0':'')+n}
    return z(d.getMonth()+1) + '-' + z(d.getDate()) + '-' + (d.getYear()+1900) + ' ' +  d.getHours() + ':' + z(d.getMinutes());
  }

  protected onReportComment(msg) {
    this.dialog.openMultiFunction(
      "Are you sure you want to report this message?",
      ["yes", "no"],
      [() => this.reportComment(msg), 
        () => null]
    );
  }

  protected onDeleteComment(msgId) {
    this.dialog.openMultiFunction(
      "Are you sure you want to delete this message?",
      ["yes", "no"],
      [() => this.deleteComment(msgId), 
        () => null]
    );
  }

  async reportComment(msg) {
    var m = await this.data.sendCommentReport(msg, this.currentUserId);
    if (m.startsWith('250')) {
      var dm = 'Report sent';
    } else {
      var dm = 'Error sending report';
    }
    this.dialog.openSingleFunction( dm, ["ok"], () => null );
  }

  async deleteComment(msg) {
    //logger(msg.msgId)
    var d = await this.data.deleteComment(msg.msgId, this.currentUserId);
    if (!(await this.checkComment(msg.msgId))){
      logger('comment '+msg.msgId+' deleted');
      //const i = this.allComments.indexOf(msg);
      const i = this.allComments.map(x => x.msgId).indexOf(msg.msgId);
      if (i > -1) {
        this.allComments.splice(i, 1);
        this.changeDetectorRef.detectChanges();
        if (SOCKETIO) this.socket.postDeleteComment({ room: this.router.url, msgId: msg.msgId });
      }
    }
  }

  private makeid() {
    var result           = '';
    var characters       = 'abcdef0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 24; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
   
}
