import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { VenueDetails } from '../services/types';
import { AuthService } from '../auth.service';


@Component({
  selector: 'gd-mapselect',
  templateUrl: './mapselect.component.html',
  //styleUrls: ['./mapselect.component.sass']
})

export class MapSelectComponent {
  protected currentUser: any = { userName: '', userId: ''};
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


    //this.venues = await this.data.getVenueCoordinates();
    //console.log(this.venues);




  }



}
