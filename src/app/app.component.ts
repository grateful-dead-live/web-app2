import { Component } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DeadApiService, DeadEvent, Recording, DeadEventInfo } from './dead-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  protected backgroundImage: SafeStyle;
  private events: DeadEvent[];
  protected selectedEvent: DeadEventInfo;
  protected selectedRec: Recording;
  protected numberOfTracks: number;
  
  constructor(private apiService: DeadApiService, private sanitizer: DomSanitizer) {
    this.apiService.getEvents()
      // .then(e => this.events = e.sort())
      .then(e => this.events = e.sort((a, b) => parseFloat(a.date.replace(/-/g, '')) - parseFloat(b.date.replace(/-/g, ''))) )
      .then(() => this.eventSelected(this.events[Math.floor(Math.random()*this.events.length)]));
  }
  
  async eventSelected(event: DeadEvent) {
    this.selectedEvent = await this.apiService.getEventInfo(event);
    this.selectedRec = this.selectedEvent.recordings[0];
    this.numberOfTracks =
      (await this.apiService.getEtreeInfo(this.selectedRec.id)).tracks.length;
    console.log(this.selectedRec.id, await this.apiService.getEtreeInfo(this.selectedRec.id))
    const imageUrl = 'url('+this.selectedEvent.location.image+')';
    this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(imageUrl);
  }

}
