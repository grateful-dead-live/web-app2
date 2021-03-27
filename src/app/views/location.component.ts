import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Location } from '../services/types';
import { AuthService } from '../auth.service';
import { DeadEventInfo } from '../services/types';
import { DialogService } from '../services/dialog.service';
import { logger } from '../globals';


declare let gtag: Function;

@Component({
  selector: 'gd-location',
  templateUrl: './location.component.html'//,
  //styleUrls: ['./location.component.sass']
})
export class LocationComponent {
  public location: Location;
  public currentUser: any = { userName: '', userId: 'None' };
  public videos: any;
  public currentVideoId: string;
  public spinTime: boolean;
  
  constructor(protected data: DataService, private router: Router,
    private route: ActivatedRoute, public auth: AuthService, private dialog: DialogService) {

      

    }

    ngOnInit() {
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
      /*
      if (this.route.snapshot.data['loggedIn']) {
        this.auth.userProfile$.subscribe(userProfile => {
          this.currentUser = this.resolve.getUser(userProfile);
        });
        logger(this.currentUser);
      } */
   
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.location = await this.data.getLocation(params.get('id'));
      }
      else {
        this.router.navigate(['/mapselect'], { replaceUrl: true });
      }


      if (params.has('id') && this.location.state) {
        this.videos = await this.data.getYoutubeList(this.location.id, ['Grateful Dead', this.location.name]);
        if (this.videos) this.currentVideoId = this.videos[0].videoId;
        logger(this.videos);
        }
      else {
        this.router.navigate(['/mapselect'], { replaceUrl: true });
      }
    });
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

}
