import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { DeadApiService } from './dead-api.service';
import { DeadEventInfo, DeadEventDetails } from './types';

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
    return this.event;
  }
  
  async getLocation(locationId: string) {
    const location = await this.apiService.getLocation(locationId);
    this.formatDates(location.events);
    return location;
  }
  
  async getVenue(venueId: string) {
    const venue = await this.apiService.getVenue(venueId);
    this.formatDates(venue.events);
    return venue;
  }
  
  async getRandomEvent() {
    return (await this.getEvent(await this.getRandomEventId()));
  }
  
  async getRandomEventId() {
    await this.loading;
    return this.events[Math.floor(Math.random()*this.events.length)].id;
  }
  
  async getRandomVenue() {
    return (await this.getRandomEvent()).venue;
  }
  
  async getRandomLocation() {
    return (await this.getRandomEvent()).location;
  }
  
  private async initEvents() {
    this.events = await this.apiService.getEvents();
    this.events.sort((a, b) => parseFloat(a.date.replace(/-/g, ''))
      - parseFloat(b.date.replace(/-/g, '')));
    this.formatDates(this.events);
  }
  
  private formatDates(objects: {date: string}[]) {
    objects.forEach(o => o.date = new Date(o.date).toLocaleDateString("en-US",
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  }

}