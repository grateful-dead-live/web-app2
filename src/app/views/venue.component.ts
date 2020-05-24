import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Venue } from '../services/types';
import { AuthService } from '../auth.service';
import { APIResolver } from '../auth.resolve';

@Component({
  selector: 'gd-venue',
  templateUrl: './venue.component.html'
})
export class VenueComponent {
  protected venue: Venue;
  protected location: string;

  protected currentUser: any;
  
  constructor(protected data: DataService, private router: Router,
    private route: ActivatedRoute, public auth: AuthService, public resolve: APIResolver) {}
  
  async ngOnInit() {
    if (this.route.snapshot.data['loggedIn']) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.currentUser = this.resolve.getUser(userProfile);
      });
      console.log(this.currentUser);
    }

    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.venue = await this.data.getVenue(params.get('id'));
        this.location = (await this.data.getEventInfo(this.venue.eventIds[0])).location;
      }
      if (!this.venue) {
        this.router.navigate(['/venue', (await this.data.getRandomVenue()).id],
          { replaceUrl: true });
      }
    });
  }
}
