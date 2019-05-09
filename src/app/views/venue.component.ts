import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'gd-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.sass']
})
export class VenueComponent {
  protected venue;
  
  constructor(protected data: DataService) {}
  
  async ngOnInit() {
    this.venue = await this.data.getVenue();
  }
}
