/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isUndefined } from "util";
/**
 * @record
 */
export function CommentPayload() { }
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
export class ChatterBoxComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdHRlci1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlhbV92aXNoYWxraGFyZS9jaGF0dGVyLWJveC8iLCJzb3VyY2VzIjpbImxpYi9jaGF0dGVyLWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7OztBQUVqQyxvQ0FPQzs7O0lBTkMsK0JBQWM7O0lBQ2QsZ0NBQXlCOztJQUN6Qiw2QkFBWTs7SUFDWixtQ0FBa0I7O0lBQ2xCLGtDQUFpQjs7SUFDakIsdUNBQXVCOztBQWlPekIsTUFBTSxPQUFPLG1CQUFtQjtJQWlCOUI7UUFQVSxpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ2hFLFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUlyRSwyQkFBc0IsR0FBVyxDQUFDLENBQUM7SUFFbkIsQ0FBQzs7OztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsT0FBdUI7UUFDcEMsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLE9BQWU7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUM3QyxDQUFDOzs7WUEvUEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeURUO3lCQUVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E0SkM7YUFFSjs7Ozs7c0JBSUUsS0FBSzswQkFDTCxLQUFLOzJCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLE1BQU07c0JBQ04sTUFBTTs7OztJQVRQLHNDQUF5Qjs7SUFDekIsMENBQTZCOztJQUM3QiwyQ0FBK0I7O0lBQy9CLHVDQUEwQjs7SUFDMUIsMENBQTRDOztJQUM1Qyw2Q0FBZ0M7O0lBQ2hDLDhDQUFpQzs7SUFDakMsNENBQXdDOztJQUN4QywyQ0FBMEU7O0lBQzFFLHNDQUFxRTs7SUFHckUsMENBQW9COztJQUNwQixxREFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tIFwidXRpbFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbW1lbnRQYXlsb2FkIHtcbiAgbXNnSWQ6IG51bWJlcjtcbiAgdXNlcklkPzogbnVtYmVyIHwgc3RyaW5nO1xuICBtc2c6IHN0cmluZztcbiAgdGltZXN0YW1wOiBzdHJpbmc7XG4gIHVzZXJOYW1lOiBzdHJpbmc7XG4gIHVzZXJJbWFnZVBhdGg/OiBzdHJpbmc7XG59XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndmlzLWNoYXR0ZXJCb3gnLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IGNsYXNzPVwidmlzLWNoYXQtd2luZG93XCI+XG4gICAgPGRpdiBjbGFzcz1cInZpcy1jaGF0LXdpbmRvdy1oZWFkZXJcIj5cbiAgICA8aW1nICpuZ0lmPVwiaGVhZGVySW1hZ2UgIT09IG51bGwgJiYgaGVhZGVySW1hZ2UgIT09IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NyY109XCJoZWFkZXJJbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwidXNlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ1c2VyLWltYWdlXCIvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidmlzLWNoYXQtd2luZG93LWhlYWRlci10ZXh0XCI+XG4gICAgICAgICAgICB7e2hlYWRpbmd9fVxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidmlzLWNoYXQtd2luZG93LWJvZHlcIiAjc2Nyb2xsTWUgW3Njcm9sbFRvcF09XCJzY3JvbGxNZS5zY3JvbGxIZWlnaHRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLWRpdlwiICpuZ0lmPVwic2hvd0Vycm9yRGl2XCI+XG4gICAgICAgICAgICB7e2Vycm9yTXNnfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCIhc2hvd0Vycm9yRGl2XCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjb21tZW50IG9mIGFsbENvbW1lbnRzXCI+XG4gICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiKGNvbW1lbnQudXNlcklkICE9PSBudWxsICYmIGNvbW1lbnQudXNlcklkICE9PSB1bmRlZmluZWQpID8gKChjb21tZW50LnVzZXJJZCA9PSBjdXJyZW50VXNlcklkKSA/ICdjb21tZW50LWN1cnJlbnRVc2VyJyA6ICdjb21tZW50JykgOidjb21tZW50J1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nICpuZ0lmPVwiIXNob3dJbWFnZU9yRGl2KGNvbW1lbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJ7e2NvbW1lbnQudXNlckltYWdlUGF0aH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJ1c2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInVzZXItaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd0ltYWdlT3JEaXYoY29tbWVudClcIiBjbGFzcz1cInVzZXItaW1hZ2UgY29sb3ItZ3JheVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHt7Y29tbWVudC51c2VyTmFtZVswXX19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWJ1YmJsZSBjb2wtMTBcIiBbbmdDbGFzc109XCIoY29tbWVudC51c2VySWQgIT09IG51bGwgJiYgY29tbWVudC51c2VySWQgIT09IHVuZGVmaW5lZCkgPyAoKGNvbW1lbnQudXNlcklkID09IGN1cnJlbnRVc2VySWQpID8gJ2NvbW1lbnQtYnViYmxlLWN1cnJlbnRVc2VyIGNvbC0xMCcgOiAnY29tbWVudC1idWJibGUgY29sLTEwJykgOidjb21tZW50LWJ1YmJsZSBjb2wtMTAnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiKGNvbW1lbnQudXNlcklkICE9PSBudWxsICYmIGNvbW1lbnQudXNlcklkICE9PSB1bmRlZmluZWQpID8gKChjb21tZW50LnVzZXJJZCA9PSBjdXJyZW50VXNlcklkKSA/ICd1c2VyLW5hbWUnIDogJ3VzZXItbmFtZSBjb2xvci1ncmF5JykgOid1c2VyLW5hbWUgY29sb3ItZ3JheSdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7Y29tbWVudC51c2VyTmFtZX19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIihjb21tZW50LnVzZXJJZCAhPT0gbnVsbCAmJiBjb21tZW50LnVzZXJJZCAhPT0gdW5kZWZpbmVkKSA/ICgoY29tbWVudC51c2VySWQgPT0gY3VycmVudFVzZXJJZCkgPyAndXNlci1jb21tZW50JyA6ICd1c2VyLWNvbW1lbnQgY29sb3ItZ3JheScpIDondXNlci1jb21tZW50IGNvbG9yLWdyYXknXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e2NvbW1lbnQubXNnfX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiKGNvbW1lbnQudXNlcklkICE9PSBudWxsICYmIGNvbW1lbnQudXNlcklkICE9PSB1bmRlZmluZWQpID8gKChjb21tZW50LnVzZXJJZCA9PSBjdXJyZW50VXNlcklkKSA/ICd0aW1lc3RhbXAnIDogJ3RpbWVzdGFtcCBjb2xvci1ncmF5JykgOid0aW1lc3RhbXAgY29sb3ItZ3JheSdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7Y29tbWVudC50aW1lc3RhbXB9fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidmlzLWNoYXQtd2luZG93LWZvb3RlclwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidmlzLWNvbW1lbnQtdGV4dEZpZWxkXCIgcGxhY2Vob2xkZXI9XCJ7e3BsYWNlaG9sZGVyVGV4dH19XCJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImNvbW1lbnRUZXh0XCJcbiAgICAgICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwiYWRkQ29tbWVudChjb21tZW50VGV4dClcIlxuICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvbktleVVwKGNvbW1lbnRUZXh0KVwiXG4gICAgICAgICAgICAgICAgbWF4bGVuZ3RoPVwie3tpbnB1dE1heExlbmd0aH19XCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLWNvdW50XCI+XG4gICAgICAgICAgICB7e3R5cGVkQ29tbWVudFRleHRMZW5ndGh9fSAvIHt7aW5wdXRNYXhMZW5ndGh9fSBjaGFyYWN0ZXJzXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIC52aXMtY2hhdC13aW5kb3cge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBmb250LWZhbWlseTogJ1JvYm90byc7XG4gICAgfVxuICAgIC52aXMtY2hhdC13aW5kb3ctaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE1QUE4O1xuICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICBwYWRkaW5nOiAwLjhlbTtcbiAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xuICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcbiAgICB9XG4gICAgLnZpcy1jaGF0LXdpbmRvdy1ib2R5IHtcbiAgICAgIGhlaWdodDogLXdlYmtpdC1maWxsLWF2YWlsYWJsZTtcbiAgICAgIG92ZXJmbG93OiBzY3JvbGw7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZ3JpZDtcbiAgICAgIGJvcmRlci1yaWdodDogIzIxNUFBOCBzb2xpZCAxcHg7XG4gICAgICBib3JkZXItbGVmdDogIzIxNUFBOCBzb2xpZCAxcHg7XG4gICAgfVxuICAgIC52aXMtY2hhdC13aW5kb3ctZm9vdGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE1QUE4O1xuICAgICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7XG4gICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMHB4O1xuICAgICAgYm9yZGVyLXJpZ2h0OiAjMjE1QUE4IHNvbGlkIDFweDtcbiAgICAgIGJvcmRlci1sZWZ0OiAjMjE1QUE4IHNvbGlkIDFweDtcbiAgICB9XG4gICAgLnZpcy1jaGF0LXdpbmRvdy1oZWFkZXItdGV4dCB7XG4gICAgICBmb250LXNpemU6IDEuNWVtO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XG4gICAgICBtYXJnaW4tbGVmdDogMC44ZW07XG4gICAgfVxuICAgIC52aXMtY2hhdC13aW5kb3ctaGVhZGVyLW1pbmltaXplOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyMDQ1ODk7XG4gICAgfVxuICAgICN2aXMtY29tbWVudC10ZXh0RmllbGQge1xuICAgICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGU7XG4gICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICBwYWRkaW5nLXRvcDogMC44ZW07XG4gICAgICBwYWRkaW5nLWJvdHRvbTogMC44ZW07XG4gICAgICBwYWRkaW5nLWxlZnQ6IDAuOGVtO1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICMyMTVBQTg7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzIxNUFBODtcbiAgICAgIGJvcmRlci1yaWdodDogIzIxNUFBOCBzb2xpZCAwLjVweDtcbiAgICAgIGJvcmRlci1sZWZ0OiAjMjE1QUE4IHNvbGlkIDAuNXB4O1xuICAgIH1cbiAgICAjdmlzLWNvbW1lbnQtdGV4dEZpZWxkOmZvY3VzIHtcbiAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgfVxuICAgIDo6bmctZGVlcCAuY2RrLW92ZXJsYXktcGFuZSAuY2hhdEJveCB7XG4gICAgICBtaW4td2lkdGg6IDQwMHB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzRmNGY0ZjtcbiAgICB9XG4gICAgOjpuZy1kZWVwIC5jZGstb3ZlcmxheS1wYW5lIC5tYXQtbWVudS1jb250ZW50IHtcbiAgICAgIHBhZGRpbmc6IDBweCAhaW1wb3J0YW50O1xuICAgICAgb3ZlcmZsb3c6IHVuc2V0ICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIDo6bmctZGVlcCAuY2RrLW92ZXJsYXktcGFuZSAubWF0LW1lbnUtcGFuZWwge1xuICAgICAgb3ZlcmZsb3c6IHVuc2V0ICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIDo6cGxhY2Vob2xkZXIge1xuICAgICAgLyogRmlyZWZveCwgQ2hyb21lLCBPcGVyYSAqL1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgY29sb3I6ICM4YzhjOGM7XG4gICAgfVxuICAgIDotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgICAgLyogSW50ZXJuZXQgRXhwbG9yZXIgMTAtMTEgKi9cbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB9XG4gICAgOjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgICAgLyogTWljcm9zb2Z0IEVkZ2UgKi9cbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB9XG4gICAgLmNvbW1lbnQge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIG1hcmdpbjogMC42ZW07XG4gICAgfVxuICAgIC5jb21tZW50LWN1cnJlbnRVc2VyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG4gICAgICBtYXJnaW46IDAuNmVtO1xuICAgIH1cbiAgICAudXNlci1pbWFnZSB7XG4gICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICB3aWR0aDogNTBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwMHB4O1xuICAgICAgYm9yZGVyOiAjODM4Mzg0IHNvbGlkIDFweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICBsaW5lLWhlaWdodDogNTBweDtcbiAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICB9XG4gICAgLmNvbW1lbnQtYnViYmxlIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGNkY1Rjg7XG4gICAgICBtYXJnaW4tbGVmdDogMC4zZW07XG4gICAgICBtYXJnaW4tcmlnaHQ6IDAuM2VtO1xuICAgICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGU7XG4gICAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTVweDtcbiAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxNXB4O1xuICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTVweDtcbiAgICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgICAgcGFkZGluZzogMWVtO1xuICAgICAgZm9udC1zaXplOiAwLjhlbTtcbiAgICB9XG5cbiAgICAuY29tbWVudC1idWJibGUtY3VycmVudFVzZXJ7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE1QUE4O1xuICAgICAgbWFyZ2luLWxlZnQ6IDAuM2VtO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwLjNlbTtcbiAgICAgIHdpZHRoOiAtd2Via2l0LWZpbGwtYXZhaWxhYmxlO1xuICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTVweDtcbiAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxNXB4O1xuICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTVweDtcbiAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwcHg7XG4gICAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICAgIHBhZGRpbmc6IDFlbTtcbiAgICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgfVxuICAgIC51c2VyLW5hbWUge1xuICAgICAgY29sb3I6ICNGQUZBRkE7XG4gICAgICBmb250LXdlaWdodDogYm9sZGVyO1xuICAgICAgZm9udC1zaXplOiAxLjFlbTtcbiAgICB9XG4gICAgLmNvbG9yLWdyYXkge1xuICAgICAgY29sb3I6ICM4MzgzODQ7XG4gICAgfVxuICAgIC50aW1lc3RhbXAge1xuICAgICAgYm90dG9tOiAwcHg7XG4gICAgICBmb250LXNpemU6IDAuNmVtO1xuICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIH1cbiAgICAuZXJyb3ItZGl2IHtcbiAgICAgIGNvbG9yOiAjODI4MjgyO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgbWFyZ2luLXRvcDogMTBlbTtcbiAgICB9XG4gICAgLmNoYXJhY3Rlci1jb3VudCB7XG4gICAgICBmb250LXNpemU6IDAuOGVtO1xuICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDAuNWVtO1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgcGFkZGluZzogMC41ZW07XG4gICAgfVxuICAgIGBcbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIENoYXR0ZXJCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGhlYWRpbmc6IHN0cmluZztcbiAgQElucHV0KCkgaGVhZGVySW1hZ2U6IHN0cmluZztcbiAgQElucHV0KCkgc2hvd0Vycm9yRGl2OiBib29sZWFuO1xuICBASW5wdXQoKSBlcnJvck1zZzogc3RyaW5nO1xuICBASW5wdXQoKSBhbGxDb21tZW50czogQXJyYXk8Q29tbWVudFBheWxvYWQ+O1xuICBASW5wdXQoKSBpbnB1dE1heExlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlclRleHQ6IHN0cmluZztcbiAgQElucHV0KCkgY3VycmVudFVzZXJJZDogbnVtYmVyIHwgc3RyaW5nO1xuICBAT3V0cHV0KCkgb25LZXl1cEVudGVyOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgb25LZXl1cDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuXG4gIGNvbW1lbnRUZXh0OiBzdHJpbmc7XG4gIHR5cGVkQ29tbWVudFRleHRMZW5ndGg6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHNob3dJbWFnZU9yRGl2KGNvbW1lbnQ6IENvbW1lbnRQYXlsb2FkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGNvbW1lbnQudXNlckltYWdlUGF0aCk7XG4gIH1cblxuICBhZGRDb21tZW50KGNvbW1lbnQ6IHN0cmluZykge1xuICAgIHRoaXMub25LZXl1cEVudGVyLmVtaXQoY29tbWVudCk7XG4gICAgdGhpcy5jb21tZW50VGV4dCA9ICcnO1xuICB9XG5cbiAgb25LZXlVcChpbnB1dDogc3RyaW5nKSB7XG4gICAgdGhpcy5vbktleXVwLmVtaXQoaW5wdXQpO1xuICAgIHRoaXMudHlwZWRDb21tZW50VGV4dExlbmd0aCA9IGlucHV0Lmxlbmd0aDtcbiAgfVxufVxuIl19