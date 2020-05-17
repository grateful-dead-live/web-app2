
# ChatterBox

ChatterBox is an angular component library planned to be utilized as chat or comment component needed for an angular application development.

## Use Cases
  One on one chat | Group Chat | Comment section
  ------ | ------ | ------
  |One on one chat with a user or a chatbot - User will see his/her chat in the blue bubble| Group chat experience- User will see his/her chat in the blue background bubble. | Comment section component - User will see his/her comment in blue background bubble. |
  |![Image of One on one chat](https://user-images.githubusercontent.com/26393389/69905426-57cb6580-13d9-11ea-8e41-b4f26025cc09.png) |![Image of Group chat](https://user-images.githubusercontent.com/26393389/69905459-b42e8500-13d9-11ea-96ec-85c70e2fc828.png) |![Image of Comment section](https://user-images.githubusercontent.com/26393389/69905403-fc00dc80-13d8-11ea-9fdb-51ee2d22f350.png) |

# How to Use?

- Import `ChatterBoxModule` in your `app.module.ts`

```import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ChatterBoxModule } from '@iam_vishalkhare/chatter-box';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		ChatterBoxModule //<-- add the module in imports
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
```
- Include `<vis-chatterBox>` component where this component is expected in your application.
```
<vis-chatterBox
	[heading]=heading
	[headerImage]=headerImage
	[allComments]=allComments
	[inputMaxLength]=inputMaxLength
	[currentUserId]=currentUserId
	[showErrorDiv]=showErrorDiv
	[errorMsg]=errorMsg
	[placeholderText]=placeholderText
	(onKeyupEnter)=sendMessage($event)
	(onKeyup)=onKeyUp(message)
>
</vis-chatterBox>
```

## To brief the signatures of the components as below
| Name | Type |  Optional? |Description |
|--|--|--|--|
|`[heading]` | `string` | No |A heading string to be displayed on the header of ChatterBox|
|`[headerImage]`|`string`|Yes|A URL to the image that should be displayed on the header along with `heading`|
|`[allComments]`|`Array<CommentPayload>`|No|Array of all comment objects. Each object will be of type `CommentPayload`. Definition of `CommentPayload` is mentioned below.|
|`[inputMaxLength]`|`number`|No|Maximum length of input allowed in the textfield of ChatterBox.|
|`[currentUserId]`|`number`  or  `string`|Yes|Any unique user Identifier of current/logged in user. This is used to show a user his/her own chats/comments in blue conversation bubble. All other chats/comments are shown in grey conversation bubbles.|
|`[showErrorDiv]`|`boolean`|Yes|Default - `false`. Set True if an error needs to be shown in chatbox instead of chats. This can be used to show errors occurring while communicating with backend.|
|`[errorMsg]`|`string`|Yes|If there is an error, set your error message in this.|
|`[placeholderText]`|`string`|Yes|This text will be visible as placeholder in input field of ChatterBox. Not providing any `placeholderText` will render no placeholder.|
|(`onKeyupEnter`)|Callback function|No|This function will be called when return is pressed on keyboard after typing a input. Use this to create a `CommentPayload` object and push it to `allComments` so that it renders on the chatbox, then do whatever you want with it. E.g. Sending the message/comment to backend etc.|
|`(onKeyup)`|Callback function|No|This function will be called on every keyup event of the text field.|

#### CommentPayload Interface

```
interface  CommentPayload {
	msgId:  number;
	userId?:  number  |  string;
	msg:  string;
	timestamp:  string;
	userName:  string;
	userImagePath?:  string;
}
```
| Name | type  | Optional | Description|
|--|--|--|--|
|`msgId`|`number`|No|Each message/comment should have a unique numeric value. |
|`userId`|`number` or `string`|Yes|Each message can have a unique userId which can be either a number or a string. This is used to identify current user show that user his/her chat/comment in blue conversation bubble.|
|`msg`|`string`|No|Actual message to be displayed in conversation bubble.|
|`timestamp`|`string`|No|Timestamp to be displayed in conversation bubble.|
|`userName`|`string`|No|User name to be displayed in conversation bubble.|
|`userImagePath`|`string`|Yes|Path to user's image. If this is not provided then Image will contain first letter of User name. (See screenshots above)|

# Sample implementation
- In `app.module.ts`
```
import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';
import { AppComponent } from  './app.component';
import { ChatterBoxModule } from '@iam_vishalkhare/chatter-box';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		ChatterBoxModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export  class  AppModule { }
```
- In `app.component.html` or wherever the ChatterBox component is required.
```
<div  style="height: 600px; width: 400px;">
	<vis-chatterBox
		[heading]=heading
		[headerImage]=headerImage
		[allComments]=allComments
		[inputMaxLength]=inputMaxLength
		[currentUserId]=currentUserId
		[showErrorDiv]=showErrorDiv
		[errorMsg]=errorMsg
		[placeholderText]=placeholderText
		(onKeyupEnter)=sendMessage($event)
		(onKeyup)=onKeyUp(message)
	>
	</vis-chatterBox>
</div>
```
###  Note that `<vis-chatterBox>` component is enclosed in a `<div>` with some height and width. This is to demonstrate that `<vis-chatterBox>` will take the height and width of it's parent `<div>`

- In `app.component.ts`
```
import { Component } from  '@angular/core';
import { CommentPayload } from '@iam_vishalkhare/chatter-box';

@Component({
	selector:  'app-root',
	templateUrl:  './app.component.html',
	styleUrls: ['./app.component.css']
})

export  class  AppComponent {
	heading  =  'John Doe';
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
```
### Result of sample implementation
![Image of Resultant output of sample implementation](https://user-images.githubusercontent.com/26393389/69912152-4d49b400-144b-11ea-8cbd-5bcc51bce8da.png)

> Give this component a try. Reach out to me at vishalkhare39@gmail.com in case of any questions/suggestions.
> Thank You...!!!
