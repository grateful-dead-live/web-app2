import { Component, Input, OnInit } from '@angular/core';

@Component({
  //template: '<youtube-player videoId="PRQCAL_RMVo"></youtube-player>',
  templateUrl: './youtube.component.html',
  selector: 'gd-youtube',
})

export class YoutubeComponent implements OnInit {
  @Input() videoId: string;

  ngOnInit() {
    //this.videoId = 'PRQCAL_RMVo';
    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
}
