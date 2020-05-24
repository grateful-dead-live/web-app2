
export const strTemplate = `
  <div class="vis-chat-window">
    <div class="vis-chat-window-header">

    <!-- <img *ngIf="headerImage !== null && headerImage !== undefined"
                            [src]="headerImage"
                            alt="user"
                            class="user-image"/> -->

        <div class="vis-chat-window-header-text">
            Comments <!--{{heading}}-->
        </div>
    </div>
    <div class="vis-chat-window-body" #scrollMe [scrollTop]="scrollMe.scrollHeight">
        <div class="error-div" *ngIf="showErrorDiv">
            {{errorMsg}}
        </div>
        <div *ngIf="!showErrorDiv">
            <div *ngFor="let comment of allComments">
              <div [ngClass]="(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'comment-currentUser' : 'comment') :'comment'">

                <!-- <div class="col-2">
                    <img *ngIf="!showImageOrDiv(comment)"
                            src="{{comment.userImagePath}}"
                            alt="user"
                            class="user-image"
                    />
                    <div *ngIf="showImageOrDiv(comment)" class="user-image color-gray">
                      {{comment.userName[0]}}
                    </div>
                </div> -->

                <div class="comment-bubble col-10" [ngClass]="(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'comment-bubble-currentUser col-10' : 'comment-bubble col-10') :'comment-bubble col-10'">
                    <div [ngClass]="(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'user-name' : 'user-name color-gray') :'user-name color-gray'">
                        {{comment.userName}}
                    </div>
                    <div [ngClass]="(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'user-comment' : 'user-comment color-gray') :'user-comment color-gray'">
                        {{comment.msg}}
                    </div>
                    <div [ngClass]="(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'timestamp' : 'timestamp color-gray') :'timestamp color-gray'">
                        {{comment.timestamp}} 
                        <button *ngIf="comment.userId == currentUserId" (click)="onDeleteButton(comment.msgId)">delete</button>
                        <button *ngIf="comment.userId != currentUserId"(click)="onReportButton(comment)">report</button>
                    </div>
                    
                </div>
              </div>
            </div>
        </div>

    </div>
    <div class="vis-chat-window-footer">
        <div>
          <textarea id="vis-comment-textField" placeholder="{{placeholderText}}"
                [(ngModel)]="commentText"
                (keyup)="onKeyUp(commentText)"
                maxlength="{{inputMaxLength}}"></textarea>
          <button type="button" (click)="addComment(commentText)">send</button> 
        </div>
        <div class="character-count">
            {{typedCommentTextLength}} / {{inputMaxLength}} characters
        </div>
        
    </div>
  </div>
  `

  export const strStyle = `
    .vis-chat-window {
      display: flex;
      flex-direction: column;
      font-family: 'Roboto';
    }
    .vis-chat-window-header {
      //display: flex;
      //justify-content: flex-start;
      background-color: #ffffff;
      color: #000000;
      //padding: 0.8em;
      //border-top-right-radius: 10px;
      //border-top-left-radius: 10px;
      font-size: 1.5em;
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
      background-color: #ffffff;
      //border-bottom-right-radius: 10px;
      //border-bottom-left-radius: 10px;
      //border-right: #215AA8 solid 1px;
      //border-left: #215AA8 solid 1px;
    }
    .vis-chat-window-header-text {
      font-size: 1em;
      //font-weight: bold;
      vertical-align: middle;
      //line-height: 50px;
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
      border-top: 1px solid #cccccc;
      border-bottom: 1px solid #cccccc;
      border-right: #cccccc solid 0.5px;
      border-left: #cccccc solid 0.5px;
      overflow: scroll;
      height: 100px;
      resize: none;
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
      //display: flex;
      justify-content: space-between;
      margin: 0.6em;
    }
    .comment-currentUser {
      //display: flex;
      justify-content: space-between;
      //flex-direction: row-reverse;
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
      white-space: pre-wrap;
      background-color: #f0f0f0;
      margin-left: 0.3em;
      margin-right: 0.3em;
      width: -webkit-fill-available;
      //border-top-right-radius: 15px;
      //border-bottom-right-radius: 15px;
      //border-bottom-left-radius: 15px;
      color: #000000;
      padding: 1em;
      font-size: 1em;
    }

    .comment-bubble-currentUser{
      white-space: pre-wrap;
      background-color: #f0f0f0;
      margin-left: 0.3em;
      margin-right: 0.3em;
      width: -webkit-fill-available;
      //border-top-left-radius: 15px;
      //border-bottom-right-radius: 15px;
      //border-bottom-left-radius: 15px;
      //border-top-right-radius: 0px;
      color: #000000;
      padding: 1em;
      font-size: 1em;
    }
    .user-name {
      color: #000000;
      font-weight: bolder;
      font-size: 1em;
    }
    .color-gray {
      color: #838384;
    }
    .timestamp {
      bottom: 0px;
      font-size: 0.7em;
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
      color: #000000;
      margin-right: 0.5em;
      font-style: italic;
      padding: 0.5em;
    }
`
