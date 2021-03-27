import { Component, Input, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  //template: '<youtube-player videoId="PRQCAL_RMVo"></youtube-player>',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.sass'],
  selector: 'gd-youtube',
})

export class YoutubeComponent implements OnInit {
  @Input() currentVideoId: string;
  @Input() videos: any[];
  @Input() width: string;
  protected currentVideoIndex: number = 0;

  constructor(protected googleAnalyticsService: GoogleAnalyticsService, private router: Router){}

  ngOnInit() {
    //this.videoId = 'PRQCAL_RMVo';
    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  selectVideo(){
    this.videos.forEach((v, i) => {
      if (v.videoId === this.currentVideoId){
        this.currentVideoIndex = i
      }
    })
   this.googleAnalyticsService.eventEmitter("youtube select", "youtube", ''+this.currentVideoIndex+' ('+this.currentVideoId+')', this.router.url);
  }

}
