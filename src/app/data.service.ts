import { Injectable } from '@angular/core';
import { DeadApiService, DeadEvent, Recording, DeadEventInfo } from './dead-api.service';

@Injectable()
export class DataService {

  private events: DeadEvent[];
  private event: DeadEventInfo;
  private recording: Recording;

  constructor(private apiService: DeadApiService) { }
  
  async getEvent() {
    if (!this.event) {
      await this.selectRandomEvent();
    }
    return this.event;
  }
  
  async getVenue() {
    return (await this.getEvent()).venue;
  }
  
  async selectRandomEvent() {
    if (!this.events) {
      this.events = await this.apiService.getEvents();
      this.events.sort((a, b) => parseFloat(a.date.replace(/-/g, ''))
        - parseFloat(b.date.replace(/-/g, '')));
    }
    await this.eventSelected(this.events[Math.floor(Math.random()*this.events.length)]);
  }

  private async eventSelected(event: DeadEvent) {
    this.event = await this.apiService.getEventInfo(event);
    this.recording = this.event.recordings[0];
    /*this.numberOfTracks =
      (await this.apiService.getEtreeInfo(this.selectedRec.id)).tracks.length;*/
  }

}