import { EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { isUndefined } from 'util';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { strTemplate, strStyle } from './chatter-box-template_style.js';

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
        this.onKeyupEnter = new EventEmitter();
        this.onKeyup = new EventEmitter();
        this.typedCommentTextLength = 0;

        //GD added
        this.emitReport = new EventEmitter();
        this.emitDelete = new EventEmitter();
        
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
        return isUndefined(comment.userImagePath);
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




    // GD added function
    ChatterBoxComponent.prototype.onReportButton = /**
     * @param {?} input
     * @return {?}
     */
    function (input) {
        this.emitReport.emit(input);
    };
     /**
     * @param {?} input
     * @return {?}
    */
    ChatterBoxComponent.prototype.onDeleteButton = /**
    * @param {?} input
    * @return {?}
    */
    function (input) {
        this.emitDelete.emit(input);
    };
    /**
     * @param {?} input
     * @return {?}
    */



    ChatterBoxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vis-chatterBox',
                    template: strTemplate,
                    styles: [strStyle]
                }] }
    ];
    /** @nocollapse */
    ChatterBoxComponent.ctorParameters = function () { return []; };
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
        onKeyup: [{ type: Output }],
        // GD added
        emitReport: [{ type: Output }],
        emitDelete: [{ type: Output }]
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
    return ChatterBoxModule;
}());

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
