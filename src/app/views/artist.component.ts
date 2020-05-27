import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistDetails } from '../services/types';
import { DataService } from '../services/data.service';
import { AuthService } from '../auth.service';
import { APIResolver } from '../auth.resolve';

@Component({
  selector: 'gd-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent {
  
  protected artist: ArtistDetails;
  protected currentUser: any;

  constructor(private data: DataService, private router: Router,
    private route: ActivatedRoute, public auth: AuthService, public resolve: APIResolver) {

      this.auth.userProfile$.subscribe(userProfile => {
        if (userProfile){
          this.currentUser = this.resolve.getUser(userProfile);}
        });

    }

  async ngOnInit() {
    /*
    if (this.route.snapshot.data['loggedIn']) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.currentUser = this.resolve.getUser(userProfile);
      });
      console.log(this.currentUser);
    }
    */

    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.artist = await this.data.getArtistDetails(params.get('id'));
        console.log(this.artist);
      }
    });
    if (!this.artist) {
      this.router.navigate(['/artist', (await this.data.getRandomArtistId())],
        { replaceUrl: true });
    }
  }

}
