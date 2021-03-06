import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DeadEventInfo, DeadEventDetails, Location, Venue, Set,
  SongDetails, ArtistDetails, VenueDetails, RecordingDetails, AudioTrack } from './types';
import { API_URL } from '../config';
import { logger } from '../globals';



export interface Recording {
  id: string,
  url: SafeResourceUrl
}

@Injectable()
export class DeadApiService {

  //private API_URL = "https://grateful-dead-api.herokuapp.com/";
  //private API_URL = "http://localhost:8060/";
  private api_url = API_URL;

  constructor() {}

  async getEvents(): Promise<DeadEventInfo[]> {
    return this.getJsonFromApi('events');
  }

  async getVenueCoordinates(): Promise<VenueDetails[]> {
    return this.getJsonFromApi('coordinates');
  }

  async getTourCoordinates(): Promise<any> {
    return this.getJsonFromApi('tours');
  }

  async getEventDetails(eventId: string): Promise<DeadEventDetails> {
    return this.getJsonFromApi('details?event='+encodeURIComponent(eventId))
  }
  
  getLocation(locationId: string): Promise<Location> {
    return this.getJsonFromApi('location?id='+encodeURIComponent(locationId));
  }
  
  getVenue(venueId: string): Promise<Venue> {
    return this.getJsonFromApi('venue?id='+encodeURIComponent(venueId));
  }
  
  getSetlist(eventId: string): Promise<Set[]> {
    return this.getJsonFromApi('setlist?event='+encodeURIComponent(eventId));
  }
  
  getSong(songId: string): Promise<SongDetails> {
    return this.getJsonFromApi('song?id='+encodeURIComponent(songId));
  }
  
  getRecordingDetails(recordingId: string): Promise<RecordingDetails> {
    return this.getJsonFromApi('recording?id='+encodeURIComponent(recordingId));
  }
  
  getRecordingTracks(recordingId: string): Promise<AudioTrack[]> {
    return this.getJsonFromApi('tracks?id='+encodeURIComponent(recordingId));
  }

  getRecordingId(eventId: string): Promise<any> {
    return this.getJsonFromApi('recordingid?id='+encodeURIComponent(eventId));
  }
  
  getArtistDetails(artistId: string): Promise<ArtistDetails> {
    return this.getJsonFromApi('artist?id='+encodeURIComponent(artistId));
  }

  getFeatureSummary(audioUri: string): Promise<{}> {
    return this.getJsonFromApi('featuresummary?audiouri='+encodeURIComponent(audioUri));
  }

  getDiachronicVersionsAudio(songName: string, count = 100, skip = 0): Promise<string[]> {
    return this.getJsonFromApi('diachronic?songname='+encodeURIComponent(songName)
      +"&count="+count+"&skip="+skip);
  }

  async getJsonFromApi(path: string): Promise<any> {
    return fetch(this.api_url+path)
      .then(r => r.text())
      .then(t => JSON.parse(t))
      .catch(e => logger(e));
  }

  async getTextFromApi(path: string): Promise<any> {
    return fetch(this.api_url+path)
      .then(r => r.text())
      .catch(e => logger(e));
  }

  async getSearchResult(q: string): Promise<any> {
    return this.getJsonFromApi('search?q='+encodeURIComponent(q));
  }

  async addBookmark(userid: string, route: string, time: number, title: string): Promise<any> {
    return this.getTextFromApi('addBookmark?userid='+userid+'&route='+route+'&time='+time+'&title='+title);
  }

  async delBookmark(userid: string, route: string): Promise<any> {
    return this.getTextFromApi('delBookmark?userid='+userid+'&route='+route);
  }

  async getBookmarks(userid: string): Promise<any> {
    return this.getJsonFromApi('getBookmarks?userid='+userid);
  }

  async checkBookmark(userid: string, route: string): Promise<any> {
    return this.getTextFromApi('checkBookmark?userid='+userid+'&route='+route);
  }

  async getComments(route: string): Promise<any> {
    return this.getJsonFromApi('getComments?route='+route);
  }



  async like(userid: string, route: string, time: number, title: string): Promise<any> {
    return this.getTextFromApi('like?userid='+userid+'&route='+route+'&time='+time+'&title='+title);
  }

  async unlike(userid: string, route: string): Promise<any> {
    return this.getTextFromApi('unlike?userid='+userid+'&route='+route);
  }

  async checkLike(userid: string, route: string): Promise<any> {
    return this.getTextFromApi('checkLike?userid='+userid+'&route='+route);
  }

  async countLikes(route: string): Promise<any> {
    return this.getTextFromApi('countLikes?route='+route);
  }

  async getLikes(userid: string): Promise<any> {
    return this.getJsonFromApi('getLikes?userid='+userid);
  }
  



  async addComment(comment: any, route: string, userid: string, title: string): Promise<any> {
    const cmt = encodeURIComponent(JSON.stringify(comment));
    return this.getTextFromApi('addComment?comment='+cmt+'&route='+route+'&userid='+userid+'&title='+title);
  }

  async checkComment(msgId: string): Promise<any> {
    return this.getJsonFromApi('checkComment?msgId='+msgId);
  }

  async getUserComments(userid: string): Promise<any> {
    return this.getJsonFromApi('getUserComments?userid='+userid);
  }

  async sendCommentReport(comment: string, userid: string): Promise<any> {
    return this.getTextFromApi('sendCommentReport?comment='+comment+'&userid='+userid);
  }

  async sendFeedback(comment: string, userid: string): Promise<any> {
    return this.getTextFromApi('sendFeedback?comment='+comment+'&userid='+userid);
  }

  async addPlaylist(name: string, playlist: string, playlistid: string, userid: string, time: number): Promise<any> {
    return this.getTextFromApi('addPlaylist?name='+name+'&playlist='+playlist+'&playlistid='+playlistid+'&userid='+userid+'&time='+time);
  }

  async getPlaylists(userid: string): Promise<any> {
    return this.getJsonFromApi('getPlaylists?userid='+userid);
  }

  async getPlaylist(playlistid: string): Promise<any> {
    return this.getJsonFromApi('getPlaylist?playlistid='+playlistid);
  }

  async delPlaylist(userid: string, playlistid: string): Promise<any> {
    return this.getTextFromApi('delPlaylist?userid='+userid+'&playlistid='+playlistid);
  }

  async deleteComment(msgid: string, userid: string): Promise<any> {
    return this.getTextFromApi('deleteComment?msgid='+msgid+'&userid='+userid);
  }

  async getRecordingInfo(recordingid: string): Promise<any> {
    return this.getJsonFromApi('getRecordingInfo?recordingid='+recordingid);
  }

  async getTracklist(recordingid: string): Promise<any> {
    return this.getJsonFromApi('getTracklist?recordingid='+recordingid);
  }

  async getYoutubeList(id: string, searcharray: string[]): Promise<any> {
    const s = encodeURIComponent(JSON.stringify(searcharray));
    return this.getJsonFromApi('youtube?id='+id+'&searcharray='+s);
  }

  async getShowIndex(): Promise<any> {   // TODO: define type
    return this.getJsonFromApi('showindex');
  }

  async getVenueIndex(): Promise<any> {   // TODO: define type
    return this.getJsonFromApi('venueindex');
  }

  async getLocationIndex(): Promise<any> {   // TODO: define type
    return this.getJsonFromApi('locationindex');
  }

  async getSongIndex(): Promise<any> {   // TODO: define type
    return this.getJsonFromApi('songindex');
  }

  connectSocket(nsp: string) {
    fetch(API_URL+'socket')

  }

}
