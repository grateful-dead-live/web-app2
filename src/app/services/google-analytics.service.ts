import { Injectable } from '@angular/core';
import { TRACKING } from '../config';

declare let gtag:Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  constructor() { }

  public eventEmitter(eventName: string, eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: number = null ){ 
    if (TRACKING){
      gtag('event', eventName, { 
              event_category: eventCategory, 
              event_label: eventLabel, 
              event_action: eventAction, 
              value: eventValue
            })
    }
  }
}
