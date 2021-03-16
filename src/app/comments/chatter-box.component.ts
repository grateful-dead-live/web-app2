import { EventEmitter, Component, Input, Output } from '@angular/core';
//import { isUndefined } from 'util';
import { CommentPayload } from '../services/types'


@Component({
    selector: 'gd-chatterbox',
    templateUrl: './chatter-box.component.html',
    styleUrls: ['./chatter-box.component.css']
  })


  export class ChatterBoxComponent {
    constructor() {}

    @Input() heading: string;
    @Input() headerImage: string;
    @Input() showErrorDiv: string;
    @Input() errorMsg: string;
    @Input() allComments: CommentPayload[];
    @Input() inputMaxLength: number;
    @Input() placeholderText: string;
    @Input() currentUserId: string;
    @Input() socketIo: boolean;

    @Output() valueChange = new EventEmitter();
    @Output() onKeyupEnter = new EventEmitter();
    @Output() onKeyup = new EventEmitter();
    @Output() emitReport = new EventEmitter();
    @Output() emitDelete = new EventEmitter();
    @Output() emitRefresh = new EventEmitter();

    public typedCommentTextLength: number;
    public commentText: string;




    ngOnInit() { }

    protected showImageOrDiv(comment){
        //return isUndefined(comment.userImagePath);
        return comment.userImagePath === undefined;
    }

    addComment(comment){
        this.onKeyupEnter.emit(comment);
        this.commentText = '';
        this.typedCommentTextLength = 0;
    }

    onKeyUp(input){
        this.onKeyup.emit(input);
        this.typedCommentTextLength = input.length;
    }

    protected onDeleteButton(input){
        this.emitDelete.emit(input);
    }

    onRefreshButton(){
        this.emitRefresh.emit();
    }

    protected onReportButton(input){
        this.emitReport.emit(input);
    }

  }