import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { DeadApiService } from './dead-api.service';
import { DeadEventInfo, DeadEventDetails, SongInfo, SongWithAudio, AudioTrack } from './types';
import { Track } from './player.service';

const ARCHIVE_URI = 'https://archive.org/download/';

@Injectable()
export class DataService {

  private loading: Promise<any>;
  private events: DeadEventInfo[];
  public event: DeadEventDetails;

  constructor(private apiService: DeadApiService) {
    this.loading = this.initEvents();
  }
  
  async getEvent(eventId: string) {
    this.event = await this.apiService.getEventDetails(eventId);
    console.log(this.event)
    return this.event;
  }
  
  async getLocation(locationId: string) {
    return await this.apiService.getLocation(locationId);
  }
  
  async getVenue(venueId: string) {
    return await this.apiService.getVenue(venueId);
  }
  
  async getSong(songId: string): Promise<SongWithAudio> {
    return this.apiService.getSong(songId);
  }
  
  getTracks(song: SongWithAudio, event: DeadEventInfo, recording: string): Track[] {
    if (song.audio && song.audio[recording]) {
      return song.audio[recording].map(a => this.toTrack(event, recording, a));
    }
    return [];
  }
  
  async getRandomTrack(): Promise<Track> {
    const randomSongInfo = _.sample(await this.getRandomSetlist());
    const randomSong = await this.apiService.getSong(randomSongInfo.id);
    const randomRecordingId = _.sample(_.keys(randomSong.audio));
    const randomAudio = _.sample(randomSong.audio[randomRecordingId]);
    const correspondingEvent = this.events.filter(e =>
      e.recordings.indexOf(randomRecordingId) >= 0)[0];
    return this.toTrack(correspondingEvent, randomRecordingId, randomAudio);
  }
  
  private toTrack(event: DeadEventInfo, recordingId: string, audio: AudioTrack): Track {
    const uri = ARCHIVE_URI+recordingId+'/'+audio.filename;
    return {
      title: audio.title + " at the " + event.venue + ", "
        + event.location + ", " + event.date,
      uri: uri,
      waveform: uri.replace('.mp3', '.png')
    };
  }
  
  async loadRandomEvent() {
    return (await this.getEvent(await this.getRandomEventId()));
  }
  
  async getRandomEventId() {
    await this.loading;
    return this.events[Math.floor(Math.random()*this.events.length)].id;
  }
  
  async getRandomVenue() {
    return (await this.loadRandomEvent()).venue;
  }
  
  async getRandomLocation() {
    return (await this.loadRandomEvent()).location;
  }
  
  async getRandomSetlist() {
    return this.apiService.getSetlist(await this.getRandomEventId());
  }
  
  private async initEvents() {
    this.events = await this.apiService.getEvents();
    this.events.sort((a, b) => parseFloat(a.date.replace(/-/g, ''))
      - parseFloat(b.date.replace(/-/g, '')));
  }

}