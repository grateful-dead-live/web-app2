import * as _ from 'lodash';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SongDetails, DeadEventInfo } from '../services/types';
import { DataService } from '../services/data.service';
import { PlayerService } from '../services/player.service';
import { DialogService } from '../services/dialog.service';
import { AuthService } from '../auth.service';

declare let gtag: Function;

@Component({
  selector: 'gd-song',
  templateUrl: './song.component.html'
})
export class SongComponent {
  
  protected song: SongDetails;
  protected subtitle: string;
  protected firstPlayed: string;
  protected lastPlayed: string;
  protected timesPlayed: number;
  protected totalRecordings: number;
  protected events: DeadEventInfo[];
  protected currentUser: any = { userName: undefined, userId: undefined};

  constructor(private data: DataService, private player: PlayerService,
    private router: Router, private route: ActivatedRoute,
    private dialog: DialogService, public auth: AuthService) {

      

    }

  async ngOnInit() {
    this.auth.userProfile$.subscribe(userProfile => {
      if (userProfile){
        this.currentUser = {
          userId: userProfile.sub.split("|")[1],
          userName: userProfile['http://example.com/username']
        }
      }
    });
    /*
    if (this.route.snapshot.data['loggedIn']) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.currentUser = this.resolve.getUser(userProfile);
      });
      console.log(this.currentUser);
    }
    */

    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.song = await this.data.getSong(params.get('id'));
        this.subtitle = _.uniq(this.song.composedBy.concat(this.song.lyricsBy)
          .map(a => a.name)).join(', ');
        this.events = await this.data.getEventInfos(this.song.eventIds);
        if (this.events.length) {
          this.firstPlayed = this.events[0].date;
          this.lastPlayed = this.events[this.events.length-1].date;
          this.timesPlayed = this.events.length;
          this.totalRecordings = _.sum(this.events.map(e => e.recordings.length));
        }
      }
      if (!this.song) {
        this.router.navigate(['/song', (await this.data.getRandomSong()).id],
          { replaceUrl: true });
      }
    });
  }

  protected openOptionsDialog(event: DeadEventInfo) {
    this.dialog.openMultiFunction(
      this.song.name+"', "+event.venue+", "+event.date,
      ["Add to playlist", "Go to show"],
      [() => this.openRecordingsDialog(event),
        () => this.router.navigate(['/show', event.id])]
    );
  }

  private openRecordingsDialog(event: DeadEventInfo) {
    this.dialog.openSingleFunction(
      "Recordings of '"+this.song.name+"', "+event.venue+", "+event.date,
      event.recordings.map(r => r.etreeId),
      r => this.addRecordingToPlaylist(r, event)
    );
  }

  private addRecordingToPlaylist(recordingId: string, event: DeadEventInfo) {
    this.data.getTracks(this.song, event, recordingId)
      .forEach(t => this.player.addToPlaylist(t));
  }

}
