import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { VenueDetails } from '../services/types';
import { AuthService } from '../auth.service';
import { APIResolver } from '../auth.resolve';


@Component({
  selector: 'gd-mapselect',
  templateUrl: './mapselect.component.html',
  //styleUrls: ['./mapselect.component.sass']
})

export class MapSelectComponent {
  protected currentUser: any;
  protected venues: VenueDetails[];
  protected test: number;

  constructor(private data: DataService, private sanitizer: DomSanitizer,
  private router: Router, private route: ActivatedRoute, public auth: AuthService, public resolve: APIResolver) {}

  ngOnInit() {
    if (this.route.snapshot.data['loggedIn']) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.currentUser = this.resolve.getUser(userProfile);
      });
      console.log(this.currentUser);
    }



    //this.venues = await this.data.getVenueCoordinates();
    //console.log(this.venues);




  }



}
