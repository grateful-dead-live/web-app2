import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DeadEventInfo, DeadEventDetails, Location, Venue, Song, EtreeInfo } from './types';

export interface Recording {
  id: string,
  url: SafeResourceUrl
}

@Injectable()
export class DeadApiService {

  //private API_URL = "https://grateful-dead-api.herokuapp.com/";
  private API_URL = "http://localhost:8060/";

  constructor(private sanitizer: DomSanitizer) {}

  async getEvents(): Promise<DeadEventInfo[]> {
    return this.getJsonFromApi('events');
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
  
  getSong(songId: string): Promise<Song> {
    return this.getJsonFromApi('song?id='+encodeURIComponent(songId));
  }

  getNews(eventId: string): Promise<string> {
    return this.getJsonFromApi('news?event='+encodeURIComponent(eventId));
  }
  
  getNews2(eventId: string): Promise<string> {
    return this.getJsonFromApi('news2?event='+encodeURIComponent(eventId));
  }

  getEtreeInfo(recordingId: string): Promise<EtreeInfo> {
    return this.getJsonFromApi('etreeinfo?recording='+encodeURIComponent(recordingId));
  }

  getFeatureSummary(audioUri: string): Promise<{}> {
    return this.getJsonFromApi('featuresummary?audiouri='+encodeURIComponent(audioUri));
  }

  getDiachronicVersionsAudio(songName: string): Promise<string[]> {
    return this.getJsonFromApi('diachronic?songname='+encodeURIComponent(songName));
  }

  async getJsonFromApi(path: string): Promise<any> {
    return fetch(this.API_URL+path)
      .then(r => r.text())
      .then(t => JSON.parse(t))
      .catch(e => console.log(e));
  }

}
