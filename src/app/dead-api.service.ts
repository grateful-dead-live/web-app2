import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface DeadEvent {
  id: string,
  date: string,
  location: string
}

export interface DeadEventInfo {
  date: string,
  location: Location,
  venue: any,
  setlist: any,
  weather: any,
  recordings: any,
  performers: any
}

interface Location {
  name: string,
  image: string,
  thumbnail: string,
  events: any
}

export interface Recording {
  id: string,
  url: SafeResourceUrl
}

export interface EtreeInfo {
  tracks: string[]
}

@Injectable()
export class DeadApiService {

  private API_URL = "https://grateful-dead-api.herokuapp.com/";
  //private API_URL = "http://localhost:8060/";

  constructor(private sanitizer: DomSanitizer) {}

  async getEvents(): Promise<DeadEvent[]> {
    return this.getJsonFromApi('events');
  }

  async getEventInfo(event: DeadEvent): Promise<DeadEventInfo> {
    return {
      date: event.date,
      location: this.cleanName(await this.getLocation(event.id)),
      venue: this.cleanName(await this.getVenue(event.id)),
      setlist: await this.getSetlist(event.id),
      weather: await this.getWeather(event.id),
      recordings: await this.getRecordings(event.id),
      performers: await this.getPerformers(event.id)
    };
  }
  
  private cleanName(location: Location): Location {
    location.name = location.name.split('_').join(' ');
    return location;
  }

  getNews(eventId: string): Promise<string> {
    return this.getJsonFromApi('news?event='+encodeURIComponent(eventId));
  }
  
  getNews2(eventId: string): Promise<string> {
    return this.getJsonFromApi('news2?event='+encodeURIComponent(eventId));
  }
  
  getLocation(eventId: string): Promise<Location> {
    return this.getJsonFromApi('location?event='+encodeURIComponent(eventId));
  }
  
  async getVenue(eventId: string): Promise<Location> {
    return this.getJsonFromApi('venue?event='+encodeURIComponent(eventId));
  }

  async getPosters(eventId: string): Promise<string> {
    return this.getJsonFromApi('posters?event='+encodeURIComponent(eventId));
  }

  getTickets(eventId: string): Promise<string> {
    return this.getJsonFromApi('tickets?event='+encodeURIComponent(eventId));
  }

  getWeather(eventId: string): Promise<string> {
    return this.getJsonFromApi('weather?event='+encodeURIComponent(eventId));
  }

  getSetlist(eventId: string): Promise<string[]> {
    return this.getJsonFromApi('setlist?event='+encodeURIComponent(eventId));
  }

  async getRecordings(eventId: string): Promise<Recording[]> {
    const ids: string[] = await this.getJsonFromApi('recordings?event='+encodeURIComponent(eventId));
    return ids.map(i => ({
      id: i,
      url: this.sanitizer.bypassSecurityTrustResourceUrl("https://archive.org/embed/"+i+"&playlist=1")
    }));
  }

  getPerformers(eventId: string): Promise<{}[]> {
    return this.getJsonFromApi('performers?event='+encodeURIComponent(eventId));
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
