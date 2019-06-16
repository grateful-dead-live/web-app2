import { Injectable } from '@angular/core';

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
  private currentTrackIndex = 0;
  private muted = false;
  
  constructor() {}
  
  addToPlaylist(track: Track) {
    this.playlist.push(track);
  }
  
  getCurrentTrack() {
    return this.playlist[this.currentTrackIndex]
      || {title:"", uri:"", waveform:""};
  }
  
  skipToTrack(track: Track) {
    this.skipToTrackAtIndex(this.playlist.indexOf(track));
  }

  play() {
    if (this.currentAudio) {
      this.currentAudio.paused ? this.pause() : null;
    } else {
      this.playPlaylist();
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
      this.reset();
    }
  }
  
  setTime(time: number) {
    if (this.currentAudio && time != Math.floor(this.currentAudio.currentTime)) {
      this.currentAudio.currentTime = time;
    }
  }
  
  toggleMute() {
    this.muted = !this.muted;
    if (this.currentAudio) {
      this.currentAudio.muted = this.muted;
    }
  }
  
  isMuted() {
    return this.muted;
  }
  
  nextTrack() {
    if (this.playlist.length) {
      this.skipToTrackAtIndex((this.currentTrackIndex+1) % this.playlist.length);
    }
  }
  
  previousTrack() {
    if (this.playlist.length) {
      this.skipToTrackAtIndex((this.currentTrackIndex-1) % this.playlist.length);
    }
  }
  
  private skipToTrackAtIndex(index: number) {
    this.currentTrackIndex = index;
    if (this.currentAudio) {
      this.stop();
      this.play();
    }
  }
  
  private async playPlaylist() {
    if (this.currentTrackIndex < this.playlist.length) {
      await this.playCurrentTrack();
      this.currentTrackIndex++;
      this.playPlaylist();
    } else {
      this.reset();
    }
  }
  
  private async playCurrentTrack() {
    const audio = new Audio(this.playlist[this.currentTrackIndex].uri);
    audio.muted = this.muted;
    audio.play();
    this.currentAudio = audio;
    audio.ontimeupdate = () => {
      this.maxTime = audio.duration;
      this.currentTime = audio.currentTime;
    };
    return new Promise(resolve => audio.onended = resolve);
  }
  
  private reset() {
    this.currentAudio.ontimeupdate = null;
    this.currentAudio.pause();
    this.currentAudio = null;
    this.currentTime = 0;
  }

}