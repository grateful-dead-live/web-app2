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
  protected checkAudio: string;
 
  // Material Style Advance Audio Player Playlist
  protected msaapDisplayTitle = true;
  protected msaapDisplayPlayList = true;
  protected msaapPageSizeOptions = [5,10,15];
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
    }); 
    this.checkAudio = '';  
  }

  eventsClick(event: any) {
    console.log('Click!', event.id);
    this.selectedEvent = event;
  }

  resetClick() {
    this.msaapPlaylist = [];
    this.checkAudio = '';
  }

  recordingsClick(recording: any) {
    console.log('Click!', recording);
    this.selectedRecording = recording;
    if (this.song.audio[this.selectedRecording]) {
      this.song.audio[this.selectedRecording].forEach((obj, index) => {
        let track = { title: this.selectedRecording + ', Title: "' + this.song.audio[this.selectedRecording][index].title + '"',
                      link: 'https://archive.org/download/' + this.selectedRecording + '/' + this.song.audio[this.selectedRecording][index].filename
        };
    if (this.containsObject(track, this.msaapPlaylist) == false) {
      this.msaapPlaylist.push(track);
      this.msaapPlaylist = [...this.msaapPlaylist];
      this.checkAudio = 'track added to playlist';
    }
    else {
      this.checkAudio = 'track already in playlist';
    }
  });
  } 
  else {
    this.checkAudio = 'no audio available'
  }
  }


containsObject(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].title == obj.title) {
            return true;
        }
    }
    return false;
  }

}
