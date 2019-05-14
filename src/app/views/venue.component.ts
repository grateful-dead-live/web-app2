import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataService } from '../services/data.service';

@Component({
  selector: 'gd-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.sass']
})
export class VenueComponent {
  protected venue;
  
  constructor(protected data: DataService, private titleService: Title) {}
  
  async ngOnInit() {
    this.venue = await this.data.getVenue();
    this.titleService.setTitle(this.venue.name);
  }
}
