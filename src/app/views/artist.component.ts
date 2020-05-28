import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistDetails } from '../services/types';
import { DataService } from '../services/data.service';
import { AuthService } from '../auth.service';
import { APIResolver } from '../auth.resolve';

declare let gtag: Function;

@Component({
  selector: 'gd-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent {
  
  protected artist: ArtistDetails;
  protected currentUser: any = { userName: '', userId: ''};

  constructor(private data: DataService, private router: Router,
    private route: ActivatedRoute, public auth: AuthService, public resolve: APIResolver) {

      
    }

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
