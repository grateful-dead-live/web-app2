import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Title, DomSanitizer, SafeStyle } from '@angular/platform-browser';
//import { VIEWS } from '../globals';
//import * as Fuse from 'fuse.js';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SearchDialogComponent } from '../shared/search-dialog.component';
import { DataService } from '../services/data.service';
import { AuthService } from '../auth.service';
import { APIResolver } from '../auth.resolve';
import { Router } from '@angular/router';
//declare var require: any;
//const searchjson = require("../../assets/search.json");

@Component({
  selector: 'gd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  
  
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() subtitle: string;
  //@ViewChild('input') input: ElementRef;
  protected image: SafeStyle;
  //protected views = VIEWS;
  //protected fuse: any;
  protected result: any;
  protected searchState: any;
  protected currentUser: any;
  protected bookmarked: any;

  
  
  constructor(private sanitizer: DomSanitizer, private titleService: Title, private dialog: MatDialog, private data: DataService, 
    public auth: AuthService, public resolve: APIResolver, private router: Router) {}
  
ngOnInit() {
    this.bookmarked = "";
    this.searchState = 0;
    this.image = this.sanitizer.bypassSecurityTrustStyle('url('+this.imageUrl+')');
    this.titleService.setTitle('Grateful Live - '+this.title+', '+this.subtitle);

    if (this.auth.loggedIn) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.currentUser = this.resolve.getUser(userProfile);
        if (!( (this.router.url == '/about') || (this.router.url == '/mapselect') || (this.router.url == '/mapselect') ))
        { this.checkBookmark() };
      });
    }
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

  async onBookmarkButton(route){
      //var result = await this.data.delBookmark(this.currentUser.userId, route);
      var result = await this.data.checkBookmark(this.currentUser.userId, this.router.url);
      console.log(result);
  }

  async checkBookmark(){
    var r = await this.data.checkBookmark(this.currentUser.userId, this.router.url);
    console.log(r);
  }

 
}
