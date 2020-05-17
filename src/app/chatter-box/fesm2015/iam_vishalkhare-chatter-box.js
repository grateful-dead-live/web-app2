import { EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { isUndefined } from 'util';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function CommentPayload() { }
if (false) {
    /** @type {?} */
    CommentPayload.prototype.msgId;
    /** @type {?|undefined} */
    CommentPayload.prototype.userId;
    /** @type {?} */
    CommentPayload.prototype.msg;
    /** @type {?} */
    CommentPayload.prototype.timestamp;
    /** @type {?} */
    CommentPayload.prototype.userName;
    /** @type {?|undefined} */
    CommentPayload.prototype.userImagePath;
}
class ChatterBoxComponent {
    constructor() {
        this.onKeyupEnter = new EventEmitter();
        this.onKeyup = new EventEmitter();
        this.typedCommentTextLength = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} comment
     * @return {?}
     */
    showImageOrDiv(comment) {
        return isUndefined(comment.userImagePath);
    }
    /**
     * @param {?} comment
     * @return {?}
     */
    addComment(comment) {
        this.onKeyupEnter.emit(comment);
        this.commentText = '';
    }
    /**
     * @param {?} input
     * @return {?}
     */
    onKeyUp(input) {
        this.onKeyup.emit(input);
        this.typedCommentTextLength = input.length;
    }
}
ChatterBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'vis-chatterBox',
                template: `
  <div class="vis-chat-window">
    <div class="vis-chat-window-header">
    <img *ngIf="headerImage !== null && headerImage !== undefined"
                            [src]="headerImage"
                            alt="user"
                            class="user-image"/>
        <div class="vis-chat-window-header-text">
            {{heading}}
        </div>
    </div>
    <div class="vis-chat-window-body" #scrollMe [scrollTop]="scrollMe.scrollHeight">
        <div class="error-div" *ngIf="showErrorDiv">
            {{errorMsg}}
        </div>
        <div *ngIf="!showErrorDiv">
            <div *ngFor="let comment of allComments">
              <div [ngClass]="(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'comment-currentUser' : 'comment') :'comment'">
                <div class="col-2">
                    <img *ngIf="!showImageOrDiv(comment)"
                            src="{{comment.userImagePath}}"
                            alt="user"
                            class="user-image"
                    />
                    <div *ngIf="showImageOrDiv(comment)" class="user-image color-gray">
                      {{comment.userName[0]}}
                    </div>
                </div>
                <div class="comment-bubble col-10" [ngClass]="(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'comment-bubble-currentUser col-10' : 'comment-bubble col-10') :'comment-bubble col-10'">
                    <div [ngClass]="(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'user-name' : 'user-name color-gray') :'user-name color-gray'">
                        {{comment.userName}}
                    </div>
                    <div [ngClass]="(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'user-comment' : 'user-comment color-gray') :'user-comment color-gray'">
                        {{comment.msg}}
                    </div>
                    <div [ngClass]="(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'timestamp' : 'timestamp color-gray') :'timestamp color-gray'">
                        {{comment.timestamp}}
                    </div>
                </div>
              </div>
            </div>
        </div>

    </div>
    <div class="vis-chat-window-footer">
        <div>
          <input type="text" id="vis-comment-textField" placeholder="{{placeholderText}}"
                [(ngModel)]="commentText"
                (keyup.enter)="addComment(commentText)"
                (keyup)="onKeyUp(commentText)"
                maxlength="{{inputMaxLength}}">
        </div>
        <div class="character-count">
            {{typedCommentTextLength}} / {{inputMaxLength}} characters
        </div>
    </div>
  </div>
  `,
                styles: [`
    .vis-chat-window {
      display: flex;
      flex-direction: column;
      font-family: 'Roboto';
    }
    .vis-chat-window-header {
      display: flex;
      justify-content: flex-start;
      background-color: #215AA8;
      color: #ffffff;
      padding: 0.8em;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }
    .vis-chat-window-body {
      height: -webkit-fill-available;
      overflow: scroll;
      display: inline-grid;
      border-right: #215AA8 solid 1px;
      border-left: #215AA8 solid 1px;
    }
    .vis-chat-window-footer {
      display: flex;
      flex-direction: column;
      width: -webkit-fill-available;
      background-color: #215AA8;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      border-right: #215AA8 solid 1px;
      border-left: #215AA8 solid 1px;
    }
    .vis-chat-window-header-text {
      font-size: 1.5em;
      font-weight: bold;
      vertical-align: middle;
      line-height: 50px;
      margin-left: 0.8em;
    }
    .vis-chat-window-header-minimize:hover {
      background-color: #204589;
    }
    #vis-comment-textField {
      width: -webkit-fill-available;
      font-size: 18px;
      padding-top: 0.8em;
      padding-bottom: 0.8em;
      padding-left: 0.8em;
      text-decoration: none;
      border: none;
      border-top: 1px solid #215AA8;
      border-bottom: 1px solid #215AA8;
      border-right: #215AA8 solid 0.5px;
      border-left: #215AA8 solid 0.5px;
    }
    #vis-comment-textField:focus {
      outline: none;
    }
    ::ng-deep .cdk-overlay-pane .chatBox {
      min-width: 400px;
      border: 1px solid #4f4f4f;
    }
    ::ng-deep .cdk-overlay-pane .mat-menu-content {
      padding: 0px !important;
      overflow: unset !important;
    }
    ::ng-deep .cdk-overlay-pane .mat-menu-panel {
      overflow: unset !important;
    }
    ::placeholder {
      /* Firefox, Chrome, Opera */
      font-size: 14px;
      color: #8c8c8c;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      font-size: 14px;
    }
    ::-ms-input-placeholder {
      /* Microsoft Edge */
      font-size: 14px;
    }
    .comment {
      display: flex;
      justify-content: space-between;
      margin: 0.6em;
    }
    .comment-currentUser {
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
      margin: 0.6em;
    }
    .user-image {
      height: 50px;
      width: 50px;
      border-radius: 500px;
      border: #838384 solid 1px;
      text-align: center;
      vertical-align: middle;
      line-height: 50px;
      font-size: 24px;
    }
    .comment-bubble {
      background-color: #F6F5F8;
      margin-left: 0.3em;
      margin-right: 0.3em;
      width: -webkit-fill-available;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      border-bottom-left-radius: 15px;
      color: #000000;
      padding: 1em;
      font-size: 0.8em;
    }

    .comment-bubble-currentUser{
      background-color: #215AA8;
      margin-left: 0.3em;
      margin-right: 0.3em;
      width: -webkit-fill-available;
      border-top-left-radius: 15px;
      border-bottom-right-radius: 15px;
      border-bottom-left-radius: 15px;
      border-top-right-radius: 0px;
      color: #ffffff;
      padding: 1em;
      font-size: 0.8em;
    }
    .user-name {
      color: #FAFAFA;
      font-weight: bolder;
      font-size: 1.1em;
    }
    .color-gray {
      color: #838384;
    }
    .timestamp {
      bottom: 0px;
      font-size: 0.6em;
      float: right;
      font-style: italic;
    }
    .error-div {
      color: #828282;
      text-align: center;
      margin-top: 10em;
    }
    .character-count {
      font-size: 0.8em;
      float: right;
      color: #ffffff;
      margin-right: 0.5em;
      font-style: italic;
      padding: 0.5em;
    }
    `]
            }] }
];
/** @nocollapse */
ChatterBoxComponent.ctorParameters = () => [];
ChatterBoxComponent.propDecorators = {
    heading: [{ type: Input }],
    headerImage: [{ type: Input }],
    showErrorDiv: [{ type: Input }],
    errorMsg: [{ type: Input }],
    allComments: [{ type: Input }],
    inputMaxLength: [{ type: Input }],
    placeholderText: [{ type: Input }],
    currentUserId: [{ type: Input }],
    onKeyupEnter: [{ type: Output }],
    onKeyup: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ChatterBoxComponent.prototype.heading;
    /** @type {?} */
    ChatterBoxComponent.prototype.headerImage;
    /** @type {?} */
    ChatterBoxComponent.prototype.showErrorDiv;
    /** @type {?} */
    ChatterBoxComponent.prototype.errorMsg;
    /** @type {?} */
    ChatterBoxComponent.prototype.allComments;
    /** @type {?} */
    ChatterBoxComponent.prototype.inputMaxLength;
    /** @type {?} */
    ChatterBoxComponent.prototype.placeholderText;
    /** @type {?} */
    ChatterBoxComponent.prototype.currentUserId;
    /** @type {?} */
    ChatterBoxComponent.prototype.onKeyupEnter;
    /** @type {?} */
    ChatterBoxComponent.prototype.onKeyup;
    /** @type {?} */
    ChatterBoxComponent.prototype.commentText;
    /** @type {?} */
    ChatterBoxComponent.prototype.typedCommentTextLength;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ChatterBoxModule {
}
ChatterBoxModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ChatterBoxComponent],
                imports: [
                    CommonModule,
                    BrowserModule,
                    FormsModule
                ],
                exports: [ChatterBoxComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ChatterBoxComponent, ChatterBoxModule };
//# sourceMappingURL=iam_vishalkhare-chatter-box.js.map
