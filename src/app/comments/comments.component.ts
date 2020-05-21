import { Component, OnInit, Input } from '@angular/core';
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
  constructor(private data: DataService, private router: Router,  private dialog: DialogService) { }

  @Input() userName: string;
  //heading = 'comments';
  //headerImage  =  '../assets/logo.png';
  showErrorDiv:  boolean;
  errorMsg  =  'This is an error';
  inputMaxLength  =  100;
  placeholderText=  'Write a comment!';
  @Input() currentUserId:  string;
  allComments:  Array<CommentPayload>;

  //msgId: any

  /*allComments:  Array<CommentPayload> = [
      {msgId:  4, userId:  9, msg:  'This is 2nd test comment', timestamp:  '21st Sept 2019', userName:  'John Doe', userImagePath:  '../assets/logo.png'},
      {msgId:  3, userId:  8, msg:  'This is a test comment', timestamp:  '21st Sept 2019', userName:  'Vishal Khare'},
      {msgId:  5, msg:  'This is 3rd test comment', timestamp:  '21st Sept 2019', userName:  'John Doe', userImagePath:  '../assets/logo.png'},
      {msgId:  4, userId:  9, msg:  'This is 2nd test comment', timestamp:  '21st Sept 2019', userName:  'John Doe', userImagePath:  '../assets/logo.png'},
  ];*/

  ngOnInit() { 
   this.getComments()
  }

  async sendMessage(msgPayload:  string) {
      // Constructing a desired object of type CommentPayload to be added to allComments
      if (msgPayload){
        var msgId = Math.floor(1000000000000000 + Math.random() * 9000000000000000);
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
    await this.data.addComment(p, this.router.url, this.currentUserId);
  }

  async checkComment(msgId) {
    console.log(msgId)
    var b = Boolean(Number(await this.data.checkComment(msgId, this.router.url)));
    console.log(b);
    return b
  }

  formatTime(d) {
    function z(n){return (n<10?'0':'')+n}
    return z(d.getMonth()+1) + '-' + z(d.getDate()) + '-' + (d.getYear()+1900) + ' ' +  d.getHours() + ':' + z(d.getMinutes());
  }

  protected reportComment(msg) {
    this.dialog.openMultiFunction(
      "Are you sure you want to report this message?",
      ["yes", "no"],
      [() => this.sendCommentReport(msg), 
        () => {}]
    );
  }

  async sendCommentReport(msg) {
   var m = await this.data.sendCommentReport(msg, this.currentUserId);
   if (Boolean(m)==true){
    this.dialog.openSingleFunction(
      "Report sent", ["ok"], () => {}
      )
   }
   console.log('mail:'+m);
  }
   
  

}
