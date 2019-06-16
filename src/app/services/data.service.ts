import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { DeadApiService } from './dead-api.service';
import { DeadEventInfo, DeadEventDetails, SongInfo, SongDetails, AudioTrack,
  Location, Venue } from './types';
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
  
  async getEventInfo(eventId: string) {
    return (await this.getEventInfos([eventId]))[0];
  }
  
  async getEventInfos(eventIds: string[]) {
    await this.loading;
    return this.events.filter(e => eventIds.indexOf(e.id) >= 0);
  }
  
  async getEventDetails(eventId: string) {
    this.event = await this.apiService.getEventDetails(eventId);
    return this.event;
  }
  
  async getLocation(locationId: string) {
    return await this.apiService.getLocation(locationId);
  }
  
  async getVenue(venueId: string) {
    return await this.apiService.getVenue(venueId);
  }
  
  async getSong(songId: string): Promise<SongDetails> {
    return this.apiService.getSong(songId);
  }
  
  async getTrack(song: SongInfo, event: DeadEventInfo, recording?: string) {
    const songDetails = await this.apiService.getSong(song.id);
    if (!recording) {
      const sbd = event.recordings.filter(r => r.isSoundboard);
      recording = sbd.length ? sbd[0].etreeId : _.sample(event.recordings).etreeId;
    }
    return this.getTracks(songDetails, event, recording)[0];
  }
  
  getTracks(song: SongDetails, event: DeadEventInfo, recording: string): Track[] {
    return song.audio && song.audio[recording] ?
      song.audio[recording].map(a => this.toTrack(event, recording, a)) : [];
  }
  
  async loadRandomEvent(): Promise<DeadEventDetails> {
    return (await this.getEventDetails(await this.getRandomEventId()));
  }
  
  async getRandomEventId(): Promise<string> {
    await this.loading;
    return this.events[Math.floor(Math.random()*this.events.length)].id;
  }
  
  async getRandomVenue(): Promise<Venue> {
    return (await this.loadRandomEvent()).venue;
  }
  
  async getRandomLocation(): Promise<Location> {
    return (await this.loadRandomEvent()).location;
  }
  
  async getRandomSetlist(): Promise<SongInfo[]> {
    return this.apiService.getSetlist(await this.getRandomEventId());
  }
  
  async getRandomSong(): Promise<SongDetails> {
    return this.apiService.getSong(_.sample(await this.getRandomSetlist()).id);
  }
  
  async getRandomTrack(): Promise<Track> {
    const randomSong = await this.getRandomSong();
    const randomRecordingId = _.sample(_.keys(randomSong.audio));
    const randomAudio = _.sample(randomSong.audio[randomRecordingId]);
    const correspondingEvent = this.events.filter(e =>
      e.recordings.map(r => r.etreeId).indexOf(randomRecordingId) >= 0)[0];
    return this.toTrack(correspondingEvent, randomRecordingId, randomAudio);
  }
  
  private toTrack(event: DeadEventInfo, recordingId: string, audio: AudioTrack): Track {
    const uri = ARCHIVE_URI+recordingId+'/'+audio.filename;
    return {
      title: audio.title + ", " + event.venue + ", "
        + event.location + ", " + event.date,
      uri: uri,
      waveform: uri.replace('.mp3', '.png')
    };
  }
  
  private async initEvents() {
    this.events = await this.apiService.getEvents();
    this.events.sort((a, b) => parseFloat(a.date.replace(/-/g, ''))
      - parseFloat(b.date.replace(/-/g, '')));
  }
  
  formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US",
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  formatDates(objects: {date: string}[]) {
    objects.forEach(o => o.date = this.formatDate(o.date));
  }

}