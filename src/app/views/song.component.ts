import * as _ from 'lodash';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SongWithAudio, DeadEventInfo } from '../services/types';
import { DataService } from '../services/data.service';
import { PlayerService } from '../services/player.service';
import { ListDialogComponent } from '../shared/list-dialog.component';

enum OPTIONS {
  ADD = "Add to playlist",
  GO = "Go to show"
}

@Component({
  selector: 'gd-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.sass']
})
export class SongComponent {
  
  protected song: SongWithAudio;
  protected firstPlayed: string;
  protected lastPlayed: string;
  protected timesPlayed: number;
  protected totalRecordings: number;
  protected events: DeadEventInfo[];

  constructor(private data: DataService, private player: PlayerService,
    private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.song = await this.data.getSong(params.get('id'));
        this.events = await this.data.getEventInfos(this.song.eventIds);
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

  onOptionsClick(event: DeadEventInfo) {
    this.dialog.open(ListDialogComponent, this.getDialogConfig(
      this.song.name+"', "+event.venue+", "+event.date,
      [OPTIONS.ADD, OPTIONS.GO]
    )).afterClosed().subscribe(result =>
      result === OPTIONS.ADD ? this.openRecordingsDialog(event)
      : result === OPTIONS.GO ? this.router.navigate(['/show', event.id])
      : null);
  }

  openRecordingsDialog(event: DeadEventInfo) {
    this.dialog.open(ListDialogComponent, this.getDialogConfig(
      "Recordings of '"+this.song.name+"', "+event.venue+", "+event.date,
      event.recordings
    )).afterClosed().subscribe(result =>
      this.recordingSelected(result, event));
  }

  recordingSelected(recordingId: string, event: DeadEventInfo) {
    this.data.getTracks(this.song, event, recordingId)
      .forEach(t => this.player.addToPlaylist(t));
  }
  
  private getDialogConfig(title: string, items: string[]) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { title: title, items: items };
    return dialogConfig;
  }

}
