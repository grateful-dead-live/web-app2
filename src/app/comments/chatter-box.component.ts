import { EventEmitter, Component, Input, Output } from '@angular/core';
import { isUndefined } from 'util';
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
        return isUndefined(comment.userImagePath);
    }

    addComment(comment){
        this.onKeyupEnter.emit(comment);
        this.commentText = '';
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



  }