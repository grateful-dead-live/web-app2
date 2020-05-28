import { Injectable } from '@angular/core';
import { TRACKING } from '../config';

declare let gtag:Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  constructor() { }

  public eventEmitter(userId: string, eventName: string, eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: number = null ){ 
    if (TRACKING){
      if (userId != '') gtag('set', {'user_id': userId});
      else gtag('set', {'user_id': undefined});
      gtag('event', eventName, { 
              event_category: eventCategory, 
              event_label: eventLabel, 
              event_action: eventAction, 
              value: eventValue
            })
    }
  }
}
