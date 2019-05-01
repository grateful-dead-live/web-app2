import { Component } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DataService } from '../data.service';

@Component({
  selector: 'venue-root',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.sass']
})
export class VenueComponent {
  
  protected venue;
  protected backgroundImage: SafeStyle;
  
  constructor(protected data: DataService, private sanitizer: DomSanitizer) {}
  
  async ngOnInit() {
    this.venue = await this.data.getVenue();
    console.log(this.venue)
    const imageUrl = 'url('+this.venue.image+')';
    this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(imageUrl);
  }

}
