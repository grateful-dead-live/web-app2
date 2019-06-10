import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SongWithAudio, DeadEventDetails, DeadEventInfo } from '../services/types';
import { DataService } from '../services/data.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'gd-song',
  templateUrl: './song.component.html',
})
export class SongComponent {
  
  protected song: SongWithAudio;
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

  recordingsClick(recordingId: string) {
    this.data.getTracks(this.song, this.selectedEvent, recordingId)
      .forEach(t => this.player.addToPlaylist(t));
  }

}
