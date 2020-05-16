import { Component, OnInit, Input } from '@angular/core';
import { CommentPayload } from '@iam_vishalkhare/chatter-box';


@Component({
  selector: 'gd-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {

  @Input() heading: string;
  headerImage  =  '../assets/logo.png';
  showErrorDiv:  boolean;
  errorMsg  =  'This is an error';
  inputMaxLength  =  100;
  placeholderText=  'Write a comment...!!!';
  currentUserId  =  8;

  allComments:  Array<CommentPayload> = [
      {msgId:  4, userId:  9, msg:  'This is 2nd test comment', timestamp:  '21st Sept 2019', userName:  'John Doe', userImagePath:  '../assets/logo.png'},
      {msgId:  3, userId:  8, msg:  'This is a test comment', timestamp:  '21st Sept 2019', userName:  'Vishal Khare'},
      {msgId:  5, msg:  'This is 3rd test comment', timestamp:  '21st Sept 2019', userName:  'John Doe', userImagePath:  '../assets/logo.png'},
      {msgId:  4, userId:  9, msg:  'This is 2nd test comment', timestamp:  '21st Sept 2019', userName:  'John Doe', userImagePath:  '../assets/logo.png'},
  ];

  ngOnInit() {}

  sendMessage(msgPayload:  string) {
      // Constructing a desired object of type CommentPayload to be added to allComments
      const  payload  = {
          msgId:  6,
          msg:  msgPayload,
          timestamp:  '21st Sept 2019',
          userName:  'Brown Fox'
      };
      this.allComments.push(payload);
  }

  onKeyUp(msgPayload:  string) {
      console.log(msgPayload);
  }
}
