import { Injectable } from '@angular/core';
import{GoogleAnalyticsService} from './google-analytics.service';

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
  public playlist: Track[] = [];
  private currentTrackIndex = 0;
  private muted = false;
  public paused = true;
  
  constructor(protected googleAnalyticsService: GoogleAnalyticsService) {}
  
  addToPlaylist(track: Track) {
    this.playlist.push(track);
  }
  
  getCurrentTrack() {
    return this.playlist[this.currentTrackIndex]
      || {title:"", uri:"", waveform:""};
  }
  
  skipToTrack(userId, track: Track) {
    this.skipToTrackAtIndex(userId, this.playlist.indexOf(track));
  }


/*
    eventName: string, 
    eventCategory: string, 
    eventAction: string, 
    eventLabel: string = null,  
    eventValue: number = null ){ 
      */


  playPause(userId) {
    if (this.playlist.length > 0){
      if (this.currentAudio) {
        if (this.currentAudio.paused) {
          this.currentAudio.play();
          this.paused = false;
        } else {
          this.currentAudio.pause();
          this.paused = true;
        }
      } else {
        this.playPlaylist(userId);
      }
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
  
  nextTrack(userId) {
    if (this.playlist.length) {
      this.skipToTrackAtIndex(userId, (this.currentTrackIndex+1) % this.playlist.length);
    }
  }
  
  previousTrack(userId) {
    if (this.playlist.length) {
      this.skipToTrackAtIndex(userId, (this.currentTrackIndex-1) % this.playlist.length);
    }
  }
  
  private skipToTrackAtIndex(userId, index: number) {
    this.currentTrackIndex = index;
    if (this.currentAudio) {
      this.stop();
      this.playPause(userId);
    }
  }
  
  private async playPlaylist(userId) {
    if (this.currentTrackIndex < this.playlist.length) {
      console.log('Google Analytics')
      this.googleAnalyticsService.eventEmitter(userId, "play", "audio_player", "play", this.getCurrentTrack().uri);
      await this.playCurrentTrack();
      this.currentTrackIndex++;
      //this.playPlaylist(userId);  // why was this here?
    } else {
      this.reset();
    }
  }
  
  private async playCurrentTrack() {
    const audio = new Audio(this.playlist[this.currentTrackIndex].uri);
    audio.muted = this.muted;
    audio.play();
    this.paused = false;
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
    this.paused = true;
  }

  volume(v) {
    if (this.currentAudio) {
      this.currentAudio.volume = v / 100;
    }
  }

}