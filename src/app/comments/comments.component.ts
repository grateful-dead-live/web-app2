import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { CommentPayload } from '../chatter-box';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'gd-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {
  constructor(private data: DataService, private router: Router,  private dialog: DialogService, private changeDetectorRef: ChangeDetectorRef) { }

  @Input() title: string;
  @Input() userName: string;
  //heading = 'comments';
  //headerImage  =  '../assets/logo.png';
  showErrorDiv:  boolean;
  errorMsg  =  'This is an error';
  inputMaxLength  =  100;
  placeholderText=  'Write a comment!';
  @Input() currentUserId:  string;
  allComments:  Array<CommentPayload>;


  ngOnInit() { 
   this.getComments();
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
      }
    }
  }
      
  onKeyUp(msgPayload:  string) {
      //console.log(msgPayload);  // doesn't work
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
  }



  async addComment(p){
    await this.data.addComment(p, this.router.url, this.currentUserId, this.title);
  }

  async checkComment(msgId) {
    //console.log(msgId)
    var b = Boolean(Number(await this.data.checkComment(msgId)));
    //console.log(b);
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
    //console.log(msg.msgId)
    var d = await this.data.deleteComment(msg.msgId, this.currentUserId);
    if (!(await this.checkComment(msg.msgId))){
      console.log('comment '+msg.msgId+' deleted');
      const i = this.allComments.indexOf(msg);
      if (i > -1) {
        this.allComments.splice(i, 1);
        this.changeDetectorRef.detectChanges();
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
