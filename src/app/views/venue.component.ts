import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Venue } from '../services/types';
import { AuthService } from '../auth.service';
import { DeadEventInfo } from '../services/types';
import { DialogService } from '../services/dialog.service';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { logger } from '../globals';

declare let gtag: Function;

@Component({
  selector: 'gd-venue',
  templateUrl: './venue.component.html'
})
export class VenueComponent {
  public venue: Venue;
  protected location: string;
  public videos: any;
  public currentVideoId: string;
  protected currentVideoIndex: number = 0;
  public spinTime: boolean;

  protected currentUser: any = { userName: '', userId: 'None' };
  
  constructor(protected data: DataService, private router: Router,
    private route: ActivatedRoute, public auth: AuthService, private dialog: DialogService,
    protected googleAnalyticsService: GoogleAnalyticsService) {}
  
  async ngOnInit() {
    setTimeout(() => {
      this.spinTime = true;
    }, 2000);
    this.auth.userProfile$.subscribe(userProfile => {
      if (userProfile){
        this.currentUser = {
          userId: userProfile.sub.split("|")[1],
          userName: userProfile['http://example.com/username']
        }
        gtag('set', {'user_id': this.currentUser.userId});
      }
    });


    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.venue = await this.data.getVenue(params.get('id'));
      }
      else {
        this.router.navigate(['/mapselect'], { replaceUrl: true });
      }


      if (params.has('id') && this.venue.name) {
        logger(this.venue)
        //this.venue = await this.data.getVenue(params.get('id'));
        this.location = (await this.data.getEventInfo(this.venue.eventIds[0])).location;
        if (this.venue) {
          this.videos = await this.data.getYoutubeList(this.venue.id, ['Grateful Dead', this.location, this.venue.name]);
          if (this.videos) this.currentVideoId = this.videos[0].videoId;
          logger(this.videos);
        }
      }
      else {
        this.router.navigate(['/mapselect'], { replaceUrl: true });
      }
    });



    /*
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.venue = await this.data.getVenue(params.get('id'));
        this.location = (await this.data.getEventInfo(this.venue.eventIds[0])).location;
        if (this.venue) {
          this.videos = await this.data.getYoutubeList(this.venue.id, ['Grateful Dead', this.location, this.venue.name]);
          this.currentVideoId = this.videos[0].videoId;
          logger(this.videos);
        }
      }
      if (!this.venue) {
        this.router.navigate(['/venue', (await this.data.getRandomVenue()).id],
          { replaceUrl: true });
      }
    }); */
  }

  protected openOptionsDialog(event: DeadEventInfo) {
    this.dialog.openMultiFunction(
      event.venue+", "+event.date,
      ["Go to show", "Go to recording"],
      [() => this.router.navigate(['/show', event.id]),
        () => this.openRecordingsDialog(event)]
    );
  }

  private openRecordingsDialog(event: DeadEventInfo) {
    this.dialog.openMultiFunction(
      "Recordings of '"+event.venue+", "+event.date,
      event.recordings.map(r => r.etreeId),
      event.recordings.map(r => () => this.router.navigate(['/recording', r.id]) )
    );
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
