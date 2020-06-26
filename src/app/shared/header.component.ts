import { Component, Input, ElementRef, AfterViewInit, ViewChild, Inject } from '@angular/core';
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
  //protected currentUser: any = { userName: '', userId:''};
  protected bookmarked: boolean;
  protected liked: boolean;
  protected likes: number;
  //protected number_liked: number;

  
  constructor(private sanitizer: DomSanitizer, private titleService: Title, private dialog: MatDialog, private data: DataService, 
    private router: Router, public auth: AuthService, private player: PlayerService) {

      
    }
  
ngOnInit() {
  this.titleService.setTitle('Grateful Live - '+this.title+', '+this.subtitle);

  if (this.userId) {
    gtag('set', {'user_id': this.userId});
    if (!( (this.router.url == '/about') || (this.router.url == '/mapselect') || (this.router.url == '/profile') ))
          { 
            this.checkBookmark();
            this.checkLike()
          };
  }
  
  this.bookmarked = false;
  this.liked = false;
  this.searchState = 0;
  this.image = this.sanitizer.bypassSecurityTrustStyle('url('+this.imageUrl+')');
  
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

  async onSubmit(e){
    console.log(e);
    this.searchState = 1;
    var result = await this.data.getSearchResult(e);
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
    console.log("bookmark: "+this.bookmarked)
  }

  async onLikeButton(){
    if (this.liked == false){
      await this.data.like(this.userId, this.router.url, new Date().getTime(), this.title+' '+this.subtitle);
    } else {
      await this.data.unlike(this.userId, this.router.url);
    }
    this.checkLike();
  }

  async checkLike(){
    var b = await this.data.checkLike(this.userId, this.router.url);
    this.liked = Boolean(JSON.parse(b));
    this.countLikes()
    console.log("like: "+this.liked)
  }

  async countLikes(){
    this.likes  = await this.data.countLikes(this.router.url);
    console.log("likes: "+this.likes)
  }

}
