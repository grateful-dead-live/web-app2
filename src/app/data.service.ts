import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { DeadApiService, DeadEvent, Recording, DeadEventInfo } from './dead-api.service';

@Injectable()
export class DataService {

  private loading: Promise<any>;
  private events: DeadEvent[];
  private event: DeadEventInfo;
  private recording: Recording;

  constructor(private apiService: DeadApiService) { }
  
  async getEvent() {
    if (!this.event) {
      if (!this.loading) {
        this.loading = this.selectRandomEvent();
      }
      await this.loading;
      this.loading = null;
    }
    return this.event;
  }
  
  async getVenue() {
    return (await this.getEvent()).venue;
  }
  
  private async selectRandomEvent() {
    await this.initEvents();
    await this.eventSelected(this.events[Math.floor(Math.random()*this.events.length)]);
  }

  private async eventSelected(event: DeadEvent) {
    this.event = await this.apiService.getEventInfo(event);
    this.recording = this.event.recordings[0];
    this.formatDates(this.event.venue.events);
    this.formatDates(this.event.location.events);
    await Promise.all([this.addArtifacts(this.event.venue.events),
      this.addArtifacts(this.event.location.events)]);
    /*this.numberOfTracks =
      (await this.apiService.getEtreeInfo(this.selectedRec.id)).tracks.length;*/
  }
  
  private async initEvents() {
    if (!this.events) {
      this.events = await this.apiService.getEvents();
      this.events.sort((a, b) => parseFloat(a.date.replace(/-/g, ''))
        - parseFloat(b.date.replace(/-/g, '')));
      this.formatDates(this.events);
    }
  }
  
  private formatDates(objects: {date: string}[]) {
    objects.forEach(o => o.date = new Date(o.date).toLocaleDateString("en-US",
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  }
  
  private async addArtifacts(events) {
    await Promise.all(_.concat(
      events.map(async e => e.tickets = await this.apiService.getTickets(e.id)),
      events.map(async e => e.posters = await this.apiService.getPosters(e.id))));
  }

}