import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Song, DeadEventDetails } from '../services/types';
import { DataService } from '../services/data.service';
import { DeadApiService } from '../services/dead-api.service';
import { Track } from 'ngx-audio-player'; 

@Component({
  selector: 'gd-song',
  templateUrl: './song.component.html',
})
export class SongComponent {
  
  protected song: Song;
  protected event: DeadEventDetails;
  protected selectedRec ;
  protected etreeinfo;
  protected selectedEvent;
  protected selectedRecording;
 
  // Material Style Advance Audio Player Playlist
  protected msaapDisplayTitle = true;
  protected msaapDisplayPlayList = true;
  protected msaapPageSizeOptions = [2,4,6];
  protected msaapPlaylist: Track[] = [];

  constructor(private data: DataService, private apiService: DeadApiService,
              private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.song = await this.data.getSong(params.get('id'));
      }
      if (!this.song) {
        this.router.navigate(['/show', await this.data.getRandomEventId()]);
      }
      this.selectedEvent = this.song.events[0];
      this.selectedRecording = this.song.audio[this.selectedEvent.recordings[0]] || null;
    });   
  }

  eventsClick(event: any) {
    console.log('Click!', event.id);
    this.selectedEvent = event;
  }

  resetClick() {
    this.msaapPlaylist = [];
  }

  recordingsClick(recording: any) {
    console.log('Click!', recording);
    this.selectedRecording = recording;
    this.msaapPlaylist = [];
    if (this.song.audio[this.selectedRecording]) {
      this.song.audio[this.selectedRecording].forEach((obj, index) => {
      this.msaapPlaylist.push(
      {
          title: this.selectedRecording + ", Track " + this.song.audio[this.selectedRecording][index].track,
          link: 'https://archive.org/download/' + this.selectedRecording + '/' + this.song.audio[this.selectedRecording][index].filename
      })
    });
  } 
    console.log(this.msaapPlaylist);
  }

}
