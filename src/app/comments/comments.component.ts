import { Component, OnInit, Input } from '@angular/core';
import { CommentPayload } from '@iam_vishalkhare/chatter-box';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'gd-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {
  constructor(private data: DataService, private router: Router) { }

  @Input() heading: string;
  headerImage  =  '../assets/logo.png';
  showErrorDiv:  boolean;
  errorMsg  =  'This is an error';
  inputMaxLength  =  100;
  placeholderText=  'Write a comment...!!!';
  @Input() currentUserId:  string;
  allComments:  Array<CommentPayload>;
  msgId: any

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
      this.msgId = Math.floor(1000000000000000 + Math.random() * 9000000000000000);
      const  payload  = {
          msgId:  this.msgId,
          msg:  msgPayload,
          timestamp:  '21st Sept 2019',
          userName:  this.heading,
          userId: this.currentUserId
      };
      var ok = false;
      try {
        await this.addComment(payload);
        ok = true;

        
    } catch (e) {
        console.error(e);
    } 
    if (await this.checkComment()){
      this.allComments.push(payload);
    }
  }
      


  onKeyUp(msgPayload:  string) {
      //console.log(msgPayload);  // doesn't work
  }

  async getComments(){
    var result = await this.data.getComments(this.router.url);
    this.allComments = JSON.parse(result)[0][this.router.url.split('/')[2]];
    if (!this.allComments) { this.allComments = [] }
    console.log(this.allComments)
  }

  async addComment(p){
    await this.data.addComment(p, this.router.url);
  }

  async checkComment() {
    console.log(this.msgId)
    return await this.data.checkComment(this.msgId, this.router.url)
    .then(b => {
      console.log(b);
      return Boolean(Number(b));
      }
    )}

}
