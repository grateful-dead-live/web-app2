import { Component, Input, ElementRef, AfterViewInit, ViewChild, Inject, OnDestroy, OnInit } from '@angular/core';
import { Title, DomSanitizer, SafeStyle } from '@angular/platform-browser';
//import { VIEWS } from '../globals';
//import * as Fuse from 'fuse.js';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SearchDialogComponent } from '../shared/search-dialog.component';
import { DataService } from '../services/data.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PlayerService } from '../services/player.service';
//import { CookieService } from 'ngx-cookie-service';
import { SOCKETIO } from '../config';
import { SocketioService } from '../services/socketio.service';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { logger } from '../globals';
import { BuyMeACoffeeComponent } from '../buymeacoffee/buymeacoffee.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { DialogService } from '../services/dialog.service';

//declare var require: any;
//const searchjson = require("../../assets/search.json");

declare let gtag: Function;

@Component({
  selector: 'gd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  
  
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() userId: string;
  //@ViewChild('input') input: ElementRef;
  protected image: SafeStyle;
  //protected views = VIEWS;
  //protected fuse: any;
  protected result: any;
  protected searchState: any;
  //protected currentUser: any = { userName: '', userId: 'None'};
  protected bookmarked: boolean;
  protected liked: boolean;
  protected likes: number;
  //protected number_liked: number;

  protected room: string;
  
  constructor(private sanitizer: DomSanitizer, private titleService: Title, private dialog: MatDialog, private data: DataService, 
    private router: Router, public auth: AuthService, private player: PlayerService, public socket: SocketioService,
    protected googleAnalyticsService: GoogleAnalyticsService, public matDialog: MatDialog, private dialogservice: DialogService) {

      
    }
  
ngOnInit() {

  this.bookmarked = false;
  this.liked = false;
  this.searchState = 0;
  this.image = this.sanitizer.bypassSecurityTrustStyle('url('+this.imageUrl+')');

  this.room = this.router.url;
  if (SOCKETIO) {
    this.socket.joinRoom(this.room);

    this.socket.like().subscribe((msg: number) => {
      logger(msg);
      this.countLikes();
      }, err => {
        logger(err);
    });
  }



  this.titleService.setTitle('Grateful Live - '+this.title+', '+this.subtitle);

  if (this.userId) {
    gtag('set', {'user_id': this.userId});
    if (!( (this.router.url == '/about') || (this.router.url == '/mapselect') || (this.router.url == '/profile') ))
          { 
            this.checkBookmark();
            this.checkLike()
          };
  }
  
  
  
  if (!( (this.router.url == '/about') || (this.router.url == '/mapselect') || (this.router.url == '/profile') ))
    this.countLikes();
  /*
    if (this.auth.loggedIn) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.currentUser = this.resolve.getUser(userProfile);
        if (!( (this.router.url == '/about') || (this.router.url == '/mapselect') || (this.router.url == '/profile') ))
        { this.checkBookmark() };
      });
    }
    */
  }

  //       else { this.player.removePlaylistFromStorage() }

  logout(){
    this.auth.logout();
    this.player.removePlaylistFromStorage();
  }

  ngOnDestroy(){
    //this.socket.leaveRoom(this.room);
  }

  async onSubmit(e){
    logger(e);
    this.searchState = 1;
    var result = await this.data.getSearchResult(e);
    this.googleAnalyticsService.eventEmitter("search", "header", "search", e);
    if (result.length > 0){
      this.openDialog(result, e)
    }
    this.searchState = 0;
  }

  openDialog(r, s) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.position = { right: '0', top: '0' };
    dialogConfig.maxHeight = 400;
    dialogConfig.data = {
      id: 1,
      result: r,
      searchString: s
     };
    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    this.dialog.open(SearchDialogComponent, dialogConfig);
  }

  async onBookmarkButton(){
    if (this.bookmarked == false){
      await this.data.addBookmark(this.userId, this.router.url, new Date().getTime(), this.title+' '+this.subtitle);
    } else {
      await this.data.delBookmark(this.userId, this.router.url);
    }
    this.checkBookmark();
  }

  async checkBookmark(){
    var b = await this.data.checkBookmark(this.userId, this.router.url);
    this.bookmarked = Boolean(JSON.parse(b));
    logger("bookmark: "+this.bookmarked)
  }

  async onLikeButton(){
    if (this.liked == false){
      await this.data.like(this.userId, this.router.url, new Date().getTime(), this.title+' '+this.subtitle);
    } else {
      await this.data.unlike(this.userId, this.router.url);
    }
    this.checkLike(true);
    
  }

  async checkLike(click=false){
    var b = await this.data.checkLike(this.userId, this.router.url);
    this.liked = Boolean(JSON.parse(b));
    this.countLikes();
    if (SOCKETIO && click) this.socket.postLike({ room: this.router.url, msg: 1 });
    logger("like: "+this.liked)
  }

  async countLikes(){
    this.likes  = await this.data.countLikes(this.router.url);
    logger("likes: "+this.likes);
  }

  buyMeACoffee() {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-component";
    dialogConfig.autoFocus = false;
    dialogConfig.height = '550px';
    dialogConfig.width = '435px';
    // https://material.angular.io/components/dialog/overview
    this.matDialog.open(BuyMeACoffeeComponent, dialogConfig);
  }

  async sendFeedback() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    //dialogConfig.id = "feedback-modal";
    dialogConfig.autoFocus = false;
    dialogConfig.height = '330px';
    dialogConfig.width = '450px';
    dialogConfig.data = {
      userid: this.userId
    };
    this.matDialog.open(FeedbackComponent, dialogConfig);
    
    /*
    var m = await this.data.sendFeedback('hello', this.userId);
    if (m.startsWith('250')) {
      var dm = 'Feedback sent';
    } else {
      var dm = 'Error sending feedback';
    }
    this.dialogservice.openSingleFunction( dm, ["ok"], () => null );
    */
  }



}
