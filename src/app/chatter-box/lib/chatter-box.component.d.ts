import { OnInit, EventEmitter } from '@angular/core';
export interface CommentPayload {
    msgId: number;
    userId?: number | string;
    msg: string;
    timestamp: string;
    userName: string;
    userImagePath?: string;
}
export declare class ChatterBoxComponent implements OnInit {
    heading: string;
    headerImage: string;
    showErrorDiv: boolean;
    errorMsg: string;
    allComments: Array<CommentPayload>;
    inputMaxLength: number;
    placeholderText: string;
    currentUserId: number | string;
    onKeyupEnter: EventEmitter<string>;
    onKeyup: EventEmitter<string>;
    commentText: string;
    typedCommentTextLength: number;
    constructor();
    ngOnInit(): void;
    showImageOrDiv(comment: CommentPayload): boolean;
    addComment(comment: string): void;
    onKeyUp(input: string): void;
}
