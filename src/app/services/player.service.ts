import { Injectable } from '@angular/core';
import { mapSeries } from './util';

export interface Track {
  title: string,
  uri: string,
  waveform: string
}

@Injectable()
export class PlayerService {
  
  public maxTime: number = 0;
  public currentTime: number = 0;
  private currentAudio: HTMLAudioElement;
  private playlist: Track[] = [];
  public currentTrack: Track = {title:"", uri:"", waveform:""};
  
  addToPlaylist(track: Track) {
    this.playlist.push(track);
    if (!this.currentTrack.title) this.currentTrack = track;
  }
  
  selectTrack(track: Track) {
    const index = this.playlist.indexOf(track);
    if (index >= 0) {
      this.stop();
      this.play(index);
    }
  }

  play(fromIndex = 0) {
    if (this.currentAudio) {
      this.currentAudio.paused ? this.pause() : null;
    } else {
      mapSeries(this.playlist.slice(fromIndex), this.playTrack.bind(this));
    }
  }
  
  pause() {
    if (this.currentAudio) {
      this.currentAudio.paused ?
        this.currentAudio.play() : this.currentAudio.pause();
    }
  }
  
  stop() {
    if (this.currentAudio) {
      this.currentAudio.ontimeupdate = null;
      this.currentAudio.pause();
      this.currentAudio = null;
      this.currentTime = 0;
    }
  }
  
  setTime(time: number) {
    if (this.currentAudio && time != Math.floor(this.currentAudio.currentTime)) {
      this.currentAudio.currentTime = time;
    }
  }
  
  private async playTrack(track: Track) {
    this.currentTrack = track;
    const audio = new Audio(track.uri);
    audio.play();
    this.currentAudio = audio;
    audio.ontimeupdate = () => {
      this.maxTime = audio.duration;
      this.currentTime = audio.currentTime;
    };
    return new Promise(resolve => audio.onended = resolve);
  }

}