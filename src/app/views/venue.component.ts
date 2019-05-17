import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../services/data.service';
import { Venue } from '../services/types';

@Component({
  selector: 'gd-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.sass']
})
export class VenueComponent {
  protected venue: Venue;
  
  constructor(protected data: DataService, private router: Router,
    private route: ActivatedRoute, private titleService: Title) {}
  
  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (!params.has('id')) {
        this.navigateToRandomVenue();
      } else {
        this.venue = await this.data.getVenue(params.get('id'));
        if (!this.venue) {
          this.navigateToRandomVenue();
        } else {
          this.titleService.setTitle(this.venue.name);
        }
      }
    });
  }
  
  private async navigateToRandomVenue() {
    this.router.navigate(['/venue', (await this.data.getRandomVenue()).id]);
  }
}
