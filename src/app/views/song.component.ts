import * as _ from 'lodash';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SongWithAudio, DeadEventInfo } from '../services/types';
import { DataService } from '../services/data.service';
import { PlayerService } from '../services/player.service';
import { ListDialogComponent } from '../shared/list-dialog.component';

@Component({
  selector: 'gd-song',
  templateUrl: './song.component.html',
})
export class SongComponent {
  
  protected song: SongWithAudio;
  protected firstPlayed: string;
  protected lastPlayed: string;
  protected timesPlayed: number;
  protected totalRecordings: number;
  protected events: DeadEventInfo[];
  protected selectedEvent: DeadEventInfo;

  constructor(private data: DataService, private player: PlayerService,
    private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.song = await this.data.getSong(params.get('id'));
        this.events = await this.data.getEventInfos(this.song.eventIds);
        this.selectedEvent = this.events[0];
        this.firstPlayed = this.events[0].date;
        this.lastPlayed = this.events[this.events.length-1].date;
        this.timesPlayed = this.events.length;
        this.totalRecordings = _.sum(this.events.map(e => e.recordings.length));
        console.log(this.song)
      }
      if (!this.song) {
        this.router.navigate(['/song', (await this.data.getRandomSong())],
          { replaceUrl: true });
      }
    });
  }

  eventsClick(event: DeadEventInfo) {
    this.selectedEvent = event;
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: "Recordings of '"+this.song.name+"' at "+event.venue+" on "+event.date,
      items: event.recordings
    }
    
    this.dialog.open(ListDialogComponent, dialogConfig)
      .afterClosed().subscribe(result => this.recordingsClick(result));
  }

  recordingsClick(recordingId: string) {
    console.log(recordingId);
    this.data.getTracks(this.song, this.selectedEvent, recordingId)
      .forEach(t => this.player.addToPlaylist(t));
  }

}
