import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Venue } from '../services/types';
import { AuthService } from '../auth.service';

declare let gtag: Function;

@Component({
  selector: 'gd-venue',
  templateUrl: './venue.component.html'
})
export class VenueComponent {
  protected venue: Venue;
  protected location: string;

  protected currentUser: any = { userName: '', userId: ''};
  
  constructor(protected data: DataService, private router: Router,
    private route: ActivatedRoute, public auth: AuthService) {}
  
  async ngOnInit() {
    this.auth.userProfile$.subscribe(userProfile => {
      if (userProfile){
        this.currentUser = {
          userId: userProfile.sub.split("|")[1],
          userName: userProfile['http://example.com/username']
        }
        gtag('set', {'user_id': this.currentUser.userId});
      }
    });

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
