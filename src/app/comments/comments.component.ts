import { Component, OnInit, Input } from '@angular/core';
import { CommentPayload } from '../chatter-box';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'gd-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {
  constructor(private data: DataService, private router: Router) { }

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
      payload.timestamp = this.formatTimeHHMMA(timestamp);
      this.allComments.push(payload);
    }
  }
      
  onKeyUp(msgPayload:  string) {
      //console.log(msgPayload);  // doesn't work
  }

  async getComments(){
    var result = await this.data.getComments(this.router.url);
    var jresult = JSON.parse(result)[0][this.router.url.split('/')[2]];
    if (jresult) { 
      for (var i in jresult) {
        jresult[i].timestamp = this.formatTimeHHMMA(new Date(Number(jresult[i].timestamp)));
      };
      this.allComments = jresult;
    } else {
      this.allComments = [] 
    }
    console.log(this.allComments)
  }

  async addComment(p){
    await this.data.addComment(p, this.router.url);
  }

  async checkComment(msgId) {
    console.log(msgId)
    return await this.data.checkComment(msgId, this.router.url)
    .then(b => {
      console.log(b);
      return Boolean(Number(b));
      })
  }

  formatTimeHHMMA(d) {
    function z(n){return (n<10?'0':'')+n}
    return z(d.getMonth()+1) + '-' + z(d.getDate()) + '-' + (d.getYear()+1900) + ' ' +  d.getHours() + ':' + z(d.getMinutes());
  }
}
