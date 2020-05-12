import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DeadEventInfo, DeadEventDetails, Location, Venue, Set,
  SongDetails, ArtistDetails, VenueDetails, RecordingDetails, AudioTrack } from './types';

export interface Recording {
  id: string,
  url: SafeResourceUrl
}

@Injectable()
export class DeadApiService {

  //private API_URL = "https://grateful-dead-api.herokuapp.com/";
  private API_URL = "http://localhost:8060/";

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
    return fetch(this.API_URL+path)
      .then(r => r.text())
      .then(t => JSON.parse(t))
      .catch(e => console.log(e));
  }

  async getTextFromApi(path: string): Promise<any> {
    return fetch(this.API_URL+path)
      .then(r => r.text())
      .catch(e => console.log(e));
  }

  async getSearchResult(q: string): Promise<any> {
    return this.getJsonFromApi('search?q='+encodeURIComponent(q));
  }

  
  async addBookmark(userid: string, route: string): Promise<any> {
    return this.getTextFromApi('addBookmark?userid='+userid+'&route='+route);
  }

  async delBookmark(userid: string, route: string): Promise<any> {
    return this.getTextFromApi('delBookmark?userid='+userid+'&route='+route);
  }

  async getBookmarks(userid: string): Promise<any> {
    return this.getTextFromApi('getBookmarks?userid='+userid);
  }


}
