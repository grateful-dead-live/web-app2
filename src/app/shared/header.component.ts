import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Title, DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { VIEWS } from '../globals';
import * as Fuse from 'fuse.js';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { SearchDialogComponent } from '../shared/search-dialog.component';


declare var require: any;
const searchjson = require("../../assets/search.json");

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
  protected views = VIEWS;
  protected fuse: any;
  protected result: any;
  
  
  
  constructor(private sanitizer: DomSanitizer, private titleService: Title, private dialog: MatDialog) {}
  
ngOnInit() {
    this.image = this.sanitizer.bypassSecurityTrustStyle('url('+this.imageUrl+')');
    this.titleService.setTitle('Grateful Live - '+this.title+', '+this.subtitle);

    var options = {
      shouldSort: true,
      tokenize: false,
      matchAllTokens: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "songs",
        "venue.location",
        "venue.name",
        "date",
        "name",
        "location"
      ]
    };
    this.fuse = new Fuse(searchjson, options);
  }



  onSubmit(e){
    console.log(e);
    var result = this.fuse.search(e)
    console.log(result)
    this.openDialog(result)
  }

  openDialog(r) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: 1,
      result: r
     };
    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    this.dialog.open(SearchDialogComponent, dialogConfig);
}

 
}
