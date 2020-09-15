import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { DeadApiService } from './dead-api.service';
import { DeadEventInfo, DeadEventDetails, SongInfo, SongDetails, AudioTrack,
  Location, Venue, VenueDetails, ArtifactType, Artifact, Set, Recording,
  RecordingDetails } from './types';
import { Track } from './player.service';
import { DEBUG } from '../config';

console.log = function(s){
  if (DEBUG) {
    console.warn(s);
  }; 
};

const ARCHIVE_URI = 'https://archive.org/download/';

export interface EventArtifact extends Artifact {
  eventInfo: string
}

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
    if (eventIds) {
      await this.loading;
      return this.events.filter(e => eventIds.indexOf(e.id) >= 0);
    }
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
  
  async getVenueCoordinates(): Promise<VenueDetails[]> {
    return this.apiService.getVenueCoordinates();
  }

  async getTourCoordinates(): Promise<VenueDetails[]> {
    return this.apiService.getTourCoordinates();
  }
  
  async getArtistDetails(artistId: string) {
    return this.apiService.getArtistDetails(artistId);
  }
  
  async getSong(songId: string): Promise<SongDetails> {
    return this.apiService.getSong(songId);
  }
  
  async getEventInfoForRecording(recordingId: string): Promise<DeadEventInfo> {
    await this.loading;
    return this.events.filter(e => e.recordings.some(r => r.id === recordingId))[0];
  }
  
  async getRecording(recordingId: string) {
    return this.apiService.getRecordingDetails(recordingId);
  }
  
  async getRecordingTracks(recording: Recording, event: DeadEventInfo): Promise<Track[]> {
    const tracks = await this.apiService.getRecordingTracks(recording.id);
    return tracks.map(t => this.toTrack(event, recording.etreeId, t, recording.id, t.id)); 
  }
  
  async getTrackFromAudio(audio: AudioTrack, event: DeadEventInfo, etreeId: string) {
    return this.toTrack(event, etreeId, audio, event.id, audio.id);  
  }
  
  async getTrack(song: SongInfo, event: DeadEventInfo, etreeId?: string, recordingId?: string) {
    const songDetails = await this.apiService.getSong(song.id);
    if (!etreeId) {
      const sbd = event.recordings.filter(r => r.isSoundboard);
      var e = sbd.length ? sbd[0] : _.sample(event.recordings);
      etreeId = e.etreeId;
      recordingId = e.id;
    } 
    return this.getTracks(songDetails, event, etreeId, recordingId)[0];
  }
  
  getTracks(song: SongDetails, event: DeadEventInfo, etreeId: string, recordingId: string): Track[] {
    return song.audio && song.audio[etreeId] ?
      song.audio[etreeId].map(a => this.toTrack(event, etreeId, a, recordingId, song.id)) : [];
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
  
  async getRandomArtifacts(types?: ArtifactType[], count = 20): Promise<EventArtifact[]> {
    await this.loading;
    let artifacts = _.flatten(this.events.map(e => e.artifacts.map(a =>
      Object.assign(a, {eventInfo: e.venue + ", " + e.location + ", " + e.date}))));
    if (types) {
      artifacts = artifacts.filter(a => types.indexOf(a.type) >= 0);
    }
    return _.sampleSize(artifacts, count);
  }
  
  async getRandomArtistId(): Promise<string> {
    await this.loading;
    return _.sample(this.event.performers).id;
  }
  
  async getRandomRecording(): Promise<RecordingDetails> {
    const randomEvent = await this.getEventInfo(await this.getRandomEventId());
    return this.apiService.getRecordingDetails(_.sample(randomEvent.recordings).id);
  }
  
  async getRandomSetlist(): Promise<Set[]> {
    return this.apiService.getSetlist(await this.getRandomEventId());
  }
  
  async getRandomSong(): Promise<SongDetails> {
    const randomSong = _.sample(_.sample(await this.getRandomSetlist()).songs);
    console.log(randomSong)
    return this.apiService.getSong(randomSong.id);
  }
  
  async getRandomTrack(): Promise<Track> {
    const randomSong = await this.getRandomSong();
   
    const randomRecordingEtreeId = _.sample(_.keys(randomSong.audio));
    const randomAudio = _.sample(randomSong.audio[randomRecordingEtreeId]);
    const correspondingEvent = this.events.filter(e =>
      e.recordings.map(r => r.etreeId).indexOf(randomRecordingEtreeId) >= 0)[0];
    return this.toTrack(correspondingEvent, randomRecordingEtreeId, randomAudio, '', randomSong.id);  // TODO: fix recordingId
  }
  
  private toTrack(event: DeadEventInfo, etreeId: string, audio: AudioTrack, recordingId: string, songId: string): Track {
    const uri = ARCHIVE_URI+etreeId+'/'+audio.filename;
    return {
      title: audio.title + ", " + event.venue + ", "
        + event.location + ", " + event.date,
      uri: uri,
      show_id: event.id,
      waveform: uri.replace('.mp3', '.png'),
      etree_id: etreeId,
      recording_id: recordingId,
      song_id: songId,
      track: audio.track
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

  async getSearchResult(q: string): Promise<any> {
    return this.apiService.getSearchResult(q);
  }

  async addBookmark(userid: string, route: string, time: number, title: string): Promise<any> {
    return this.apiService.addBookmark(userid, route, time, title);
  }

  async delBookmark(userid: string, route: string): Promise<any> {
    return this.apiService.delBookmark(userid, route);
  }

  async getBookmarks(userid: string): Promise<any> {
    return this.apiService.getBookmarks(userid);
  }

  async checkBookmark(userid: string, route: string): Promise<any> {
    return this.apiService.checkBookmark(userid, route);
  }
  
  async like(userid: string, route: string, time: number, title: string): Promise<any> {
    return this.apiService.like(userid, route, time, title);
  }

  async unlike(userid: string, route: string): Promise<any> {
    return this.apiService.unlike(userid, route);
  }

  async checkLike(userid: string, route: string): Promise<any> {
    return this.apiService.checkLike(userid, route);
  }

  async countLikes(route: string): Promise<any> {
    return this.apiService.countLikes(route);
  }
  
  async getLikes(userid: string): Promise<any> {
    return this.apiService.getLikes(userid);
  }

  async getComments(route: string): Promise<any> {
    return this.apiService.getComments(route);
  }

  async addComment(comment: any, route: string, userid: string, title: string): Promise<any> {
    return this.apiService.addComment(comment, route, userid, title);
  }

  async checkComment(msgId: string): Promise<any> {
    return this.apiService.checkComment(msgId);
  }

  async getUserComments(userid: string): Promise<any> {
    return this.apiService.getUserComments(userid);
  }

  async sendCommentReport(msg: any, userid: string): Promise<any> {
    const comment = encodeURIComponent(JSON.stringify(msg));
    return this.apiService.sendCommentReport(comment, userid);
  }

  async addPlaylist(name: string, playlist: Track[], playlistid: string, userid: string, time: number): Promise<any> {
    const p = encodeURIComponent(JSON.stringify(playlist));
    return this.apiService.addPlaylist(name, p, playlistid, userid, time);
  }

  async getPlaylists(userid: string): Promise<any> {
    return this.apiService.getPlaylists(userid);
  }

  async getPlaylist(playlistid: string): Promise<any> {
    return this.apiService.getPlaylist(playlistid);
  }

  async delPlaylist(userid: string, playlistid: string): Promise<any> {
    return this.apiService.delPlaylist(userid, playlistid);
  }

  async deleteComment(msgid: string, userid: string): Promise<any> {
    return this.apiService.deleteComment(msgid, userid);
  }

  async getRecordingInfo(recordingid: string){
    return this.apiService.getRecordingInfo(recordingid);
  }

  async getTracklist(recordingid: string){
    return this.apiService.getTracklist(recordingid);
  }

  toPlayerTrack(venue: string, location: string, date: string, showId: string, etreeId: string, 
                        audio: AudioTrack, recordingId: string): Track {
    const uri = ARCHIVE_URI+etreeId+'/'+audio.filename;
    return {
      title: audio.title + ", " + venue + ", "
        + location + ", " + date,
      uri: uri,
      show_id: showId,
      waveform: uri.replace('.mp3', '.png'),
      etree_id: etreeId,
      recording_id: recordingId,
      song_id: audio.id,
      track: audio.track
    };
  }

  async getYoutubeList(id: string, searchArray: string[]){
    return this.apiService.getYoutubeList(id, searchArray);
  }

  async getShowIndex(){
    return this.apiService.getShowIndex();
  }

}