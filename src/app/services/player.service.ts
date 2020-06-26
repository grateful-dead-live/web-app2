import { Injectable } from '@angular/core';
import{GoogleAnalyticsService} from './google-analytics.service';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';

export interface Track {
  title: string,
  uri: string,
  waveform: string,
  show_id: string,
  etree_id: string,
  recording_id: string,
  song_id: string,
  track: string
}

@Injectable()
export class PlayerService {
  
  public maxTime: number = 0;
  public currentTime: number = 0;
  private currentAudio: HTMLAudioElement;
  public playlist: Track[] = [];
  private currentTrackIndex = 0;
  public muted = false;
  public paused = true;
  public playlists = [];
  public playlistsLoaded = false;
  
  constructor(protected googleAnalyticsService: GoogleAnalyticsService, private data: DataService, private dialog: DialogService) {}
  
  addToPlaylist(track: Track) {
    if (this.playlist.length < 100) {
      this.playlist.push(track);
      this.storePlaylist();
    }
    else {
      this.dialog.openSingleFunction( 'Playlist is limited to 100 tracks.', ["ok"], () => null );
    }
  }

  deleteFromPlaylist(i){
    this.playlist.splice(i, 1);
    this.storePlaylist();
  }
  
  getCurrentTrack() {
    return this.playlist[this.currentTrackIndex]
      || {title:"", uri:"", waveform:""};
  }
  
  skipToTrack(track: Track) {
    this.skipToTrackAtIndex(this.playlist.indexOf(track));
  }


/*
    eventName: string, 
    eventCategory: string, 
    eventAction: string, 
    eventLabel: string = null,  
    eventValue: number = null ){ 
      */


  playPause() {
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
        this.playPlaylist();
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
      this.playPause();
    }
  }
  
  private async playPlaylist() {
    if (this.currentTrackIndex < this.playlist.length) {
      console.log('Google Analytics')
      this.googleAnalyticsService.eventEmitter("play", "audio_player", "play", this.getCurrentTrack().uri);
      await this.playCurrentTrack();
      this.currentTrackIndex++;
      //this.playPlaylist();  // why was this here?
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

  async getPlaylists(userId){
    var result = await this.data.getPlaylists(userId);
    if (result[0].playlists){
      var p = result[0].playlists;
      p.sort(function(a, b) { return a.timestamp - b.timestamp }).reverse();
      p.forEach(i => i.timestamp = this.formatTime(new Date(Number(i.timestamp))));
      this.playlists = p;
      this.playlistsLoaded = true;      
    }
  }

  async deletePlaylist(userid, playlistid){
    await this.data.delPlaylist(userid, playlistid);
    this.getPlaylists(userid);
  }
  
  formatTime(d) {
    function z(n){return (n<10?'0':'')+n}
    return z(d.getMonth()+1) + '-' + z(d.getDate()) + '-' + (d.getYear()+1900) + ' ' +  d.getHours() + ':' + z(d.getMinutes());
  }

  storePlaylist(){
    localStorage.setItem('playlist', btoa(JSON.stringify(this.playlist)));
  }
  
  removePlaylistFromStorage(){
    localStorage.removeItem('playlist');
  }

  loadPlaylistFromsStorage(){
    var p = localStorage.getItem('playlist');
    if (p) this.playlist = JSON.parse(atob(p));
  }

}