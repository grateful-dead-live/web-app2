import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Song, DeadEventDetails, DeadEventInfo } from '../services/types';
import { DataService } from '../services/data.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'gd-song',
  templateUrl: './song.component.html',
})
export class SongComponent {
  
  protected song: Song;
  protected event: DeadEventDetails;
  protected selectedEvent: DeadEventInfo;

  constructor(private data: DataService, private player: PlayerService,
    private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.song = await this.data.getSong(params.get('id'));
      }
      if (!this.song) {
        this.router.navigate(['/show', await this.data.getRandomEventId()]);
      }
    });
  }

  eventsClick(event: any) {
    this.selectedEvent = event;
  }

  recordingsClick(recording: any) {
    this.data.getTracks(this.song, this.selectedEvent, recording).forEach(t =>
      this.player.addToPlaylist(t));
  }

}
