import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { VenueDetails } from '../services/types';
import { AuthService } from '../auth.service';


declare let gtag: Function;

@Component({
  selector: 'gd-mapselect',
  templateUrl: './mapselect.component.html',
  //styleUrls: ['./mapselect.component.sass']
})

export class MapSelectComponent {
  public currentUser: any = { userName: '', userId: 'None' };
  protected venues: VenueDetails[];
  protected test: number;

  constructor(private data: DataService, private sanitizer: DomSanitizer,
  public auth: AuthService) {

    

  }

  ngOnInit() {
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
      loggerthis.currentUser);
    }
    */


    //this.venues = await this.data.getVenueCoordinates();
    //logger(this.venues);




  }



}
