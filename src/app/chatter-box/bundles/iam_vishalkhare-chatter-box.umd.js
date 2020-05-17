(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('util'), require('@angular/common'), require('@angular/platform-browser'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@iam_vishalkhare/chatter-box', ['exports', '@angular/core', 'util', '@angular/common', '@angular/platform-browser', '@angular/forms'], factory) :
    (global = global || self, factory((global.iam_vishalkhare = global.iam_vishalkhare || {}, global.iam_vishalkhare['chatter-box'] = {}), global.ng.core, global.util, global.ng.common, global.ng.platformBrowser, global.ng.forms));
}(this, (function (exports, core, util, common, platformBrowser, forms) { 'use strict';

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
    var ChatterBoxComponent = /** @class */ (function () {
        function ChatterBoxComponent() {
            this.onKeyupEnter = new core.EventEmitter();
            this.onKeyup = new core.EventEmitter();
            this.typedCommentTextLength = 0;
        }
        /**
         * @return {?}
         */
        ChatterBoxComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
        };
        /**
         * @param {?} comment
         * @return {?}
         */
        ChatterBoxComponent.prototype.showImageOrDiv = /**
         * @param {?} comment
         * @return {?}
         */
        function (comment) {
            return util.isUndefined(comment.userImagePath);
        };
        /**
         * @param {?} comment
         * @return {?}
         */
        ChatterBoxComponent.prototype.addComment = /**
         * @param {?} comment
         * @return {?}
         */
        function (comment) {
            this.onKeyupEnter.emit(comment);
            this.commentText = '';
        };
        /**
         * @param {?} input
         * @return {?}
         */
        ChatterBoxComponent.prototype.onKeyUp = /**
         * @param {?} input
         * @return {?}
         */
        function (input) {
            this.onKeyup.emit(input);
            this.typedCommentTextLength = input.length;
        };
        ChatterBoxComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'vis-chatterBox',
                        template: "\n  <div class=\"vis-chat-window\">\n    <div class=\"vis-chat-window-header\">\n    <img *ngIf=\"headerImage !== null && headerImage !== undefined\"\n                            [src]=\"headerImage\"\n                            alt=\"user\"\n                            class=\"user-image\"/>\n        <div class=\"vis-chat-window-header-text\">\n            {{heading}}\n        </div>\n    </div>\n    <div class=\"vis-chat-window-body\" #scrollMe [scrollTop]=\"scrollMe.scrollHeight\">\n        <div class=\"error-div\" *ngIf=\"showErrorDiv\">\n            {{errorMsg}}\n        </div>\n        <div *ngIf=\"!showErrorDiv\">\n            <div *ngFor=\"let comment of allComments\">\n              <div [ngClass]=\"(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'comment-currentUser' : 'comment') :'comment'\">\n                <div class=\"col-2\">\n                    <img *ngIf=\"!showImageOrDiv(comment)\"\n                            src=\"{{comment.userImagePath}}\"\n                            alt=\"user\"\n                            class=\"user-image\"\n                    />\n                    <div *ngIf=\"showImageOrDiv(comment)\" class=\"user-image color-gray\">\n                      {{comment.userName[0]}}\n                    </div>\n                </div>\n                <div class=\"comment-bubble col-10\" [ngClass]=\"(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'comment-bubble-currentUser col-10' : 'comment-bubble col-10') :'comment-bubble col-10'\">\n                    <div [ngClass]=\"(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'user-name' : 'user-name color-gray') :'user-name color-gray'\">\n                        {{comment.userName}}\n                    </div>\n                    <div [ngClass]=\"(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'user-comment' : 'user-comment color-gray') :'user-comment color-gray'\">\n                        {{comment.msg}}\n                    </div>\n                    <div [ngClass]=\"(comment.userId !== null && comment.userId !== undefined) ? ((comment.userId == currentUserId) ? 'timestamp' : 'timestamp color-gray') :'timestamp color-gray'\">\n                        {{comment.timestamp}}\n                    </div>\n                </div>\n              </div>\n            </div>\n        </div>\n\n    </div>\n    <div class=\"vis-chat-window-footer\">\n        <div>\n          <input type=\"text\" id=\"vis-comment-textField\" placeholder=\"{{placeholderText}}\"\n                [(ngModel)]=\"commentText\"\n                (keyup.enter)=\"addComment(commentText)\"\n                (keyup)=\"onKeyUp(commentText)\"\n                maxlength=\"{{inputMaxLength}}\">\n        </div>\n        <div class=\"character-count\">\n            {{typedCommentTextLength}} / {{inputMaxLength}} characters\n        </div>\n    </div>\n  </div>\n  ",
                        styles: ["\n    .vis-chat-window {\n      display: flex;\n      flex-direction: column;\n      font-family: 'Roboto';\n    }\n    .vis-chat-window-header {\n      display: flex;\n      justify-content: flex-start;\n      background-color: #215AA8;\n      color: #ffffff;\n      padding: 0.8em;\n      border-top-right-radius: 10px;\n      border-top-left-radius: 10px;\n    }\n    .vis-chat-window-body {\n      height: -webkit-fill-available;\n      overflow: scroll;\n      display: inline-grid;\n      border-right: #215AA8 solid 1px;\n      border-left: #215AA8 solid 1px;\n    }\n    .vis-chat-window-footer {\n      display: flex;\n      flex-direction: column;\n      width: -webkit-fill-available;\n      background-color: #215AA8;\n      border-bottom-right-radius: 10px;\n      border-bottom-left-radius: 10px;\n      border-right: #215AA8 solid 1px;\n      border-left: #215AA8 solid 1px;\n    }\n    .vis-chat-window-header-text {\n      font-size: 1.5em;\n      font-weight: bold;\n      vertical-align: middle;\n      line-height: 50px;\n      margin-left: 0.8em;\n    }\n    .vis-chat-window-header-minimize:hover {\n      background-color: #204589;\n    }\n    #vis-comment-textField {\n      width: -webkit-fill-available;\n      font-size: 18px;\n      padding-top: 0.8em;\n      padding-bottom: 0.8em;\n      padding-left: 0.8em;\n      text-decoration: none;\n      border: none;\n      border-top: 1px solid #215AA8;\n      border-bottom: 1px solid #215AA8;\n      border-right: #215AA8 solid 0.5px;\n      border-left: #215AA8 solid 0.5px;\n    }\n    #vis-comment-textField:focus {\n      outline: none;\n    }\n    ::ng-deep .cdk-overlay-pane .chatBox {\n      min-width: 400px;\n      border: 1px solid #4f4f4f;\n    }\n    ::ng-deep .cdk-overlay-pane .mat-menu-content {\n      padding: 0px !important;\n      overflow: unset !important;\n    }\n    ::ng-deep .cdk-overlay-pane .mat-menu-panel {\n      overflow: unset !important;\n    }\n    ::placeholder {\n      /* Firefox, Chrome, Opera */\n      font-size: 14px;\n      color: #8c8c8c;\n    }\n    :-ms-input-placeholder {\n      /* Internet Explorer 10-11 */\n      font-size: 14px;\n    }\n    ::-ms-input-placeholder {\n      /* Microsoft Edge */\n      font-size: 14px;\n    }\n    .comment {\n      display: flex;\n      justify-content: space-between;\n      margin: 0.6em;\n    }\n    .comment-currentUser {\n      display: flex;\n      justify-content: space-between;\n      flex-direction: row-reverse;\n      margin: 0.6em;\n    }\n    .user-image {\n      height: 50px;\n      width: 50px;\n      border-radius: 500px;\n      border: #838384 solid 1px;\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      font-size: 24px;\n    }\n    .comment-bubble {\n      background-color: #F6F5F8;\n      margin-left: 0.3em;\n      margin-right: 0.3em;\n      width: -webkit-fill-available;\n      border-top-right-radius: 15px;\n      border-bottom-right-radius: 15px;\n      border-bottom-left-radius: 15px;\n      color: #000000;\n      padding: 1em;\n      font-size: 0.8em;\n    }\n\n    .comment-bubble-currentUser{\n      background-color: #215AA8;\n      margin-left: 0.3em;\n      margin-right: 0.3em;\n      width: -webkit-fill-available;\n      border-top-left-radius: 15px;\n      border-bottom-right-radius: 15px;\n      border-bottom-left-radius: 15px;\n      border-top-right-radius: 0px;\n      color: #ffffff;\n      padding: 1em;\n      font-size: 0.8em;\n    }\n    .user-name {\n      color: #FAFAFA;\n      font-weight: bolder;\n      font-size: 1.1em;\n    }\n    .color-gray {\n      color: #838384;\n    }\n    .timestamp {\n      bottom: 0px;\n      font-size: 0.6em;\n      float: right;\n      font-style: italic;\n    }\n    .error-div {\n      color: #828282;\n      text-align: center;\n      margin-top: 10em;\n    }\n    .character-count {\n      font-size: 0.8em;\n      float: right;\n      color: #ffffff;\n      margin-right: 0.5em;\n      font-style: italic;\n      padding: 0.5em;\n    }\n    "]
                    }] }
        ];
        /** @nocollapse */
        ChatterBoxComponent.ctorParameters = function () { return []; };
        ChatterBoxComponent.propDecorators = {
            heading: [{ type: core.Input }],
            headerImage: [{ type: core.Input }],
            showErrorDiv: [{ type: core.Input }],
            errorMsg: [{ type: core.Input }],
            allComments: [{ type: core.Input }],
            inputMaxLength: [{ type: core.Input }],
            placeholderText: [{ type: core.Input }],
            currentUserId: [{ type: core.Input }],
            onKeyupEnter: [{ type: core.Output }],
            onKeyup: [{ type: core.Output }]
        };
        return ChatterBoxComponent;
    }());
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
    var ChatterBoxModule = /** @class */ (function () {
        function ChatterBoxModule() {
        }
        ChatterBoxModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [ChatterBoxComponent],
                        imports: [
                            common.CommonModule,
                            platformBrowser.BrowserModule,
                            forms.FormsModule
                        ],
                        exports: [ChatterBoxComponent]
                    },] }
        ];
        return ChatterBoxModule;
    }());

    exports.ChatterBoxComponent = ChatterBoxComponent;
    exports.ChatterBoxModule = ChatterBoxModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=iam_vishalkhare-chatter-box.umd.js.map
