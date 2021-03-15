import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../auth.service';


declare let gtag: Function;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  public selected: String;
  public shows: any;
  public venues: any;
  public locations: any;
  public songs: any;
  public test: string;
  public currentUser: any = { userName: '', userId: 'None' };

  constructor(private data: DataService, public auth: AuthService) { }

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
    
    this.selected = 'shows';
    this.onSelectButton('shows');
  }

  public onSelectButton(s) {
    this.selected = s;
    switch(s) {
      case 'shows':
        this.getShows();
        break;
      case 'venues':
        this.getVenues();
        break;
      case 'locations':
        this.getLocations();
        break;
      case 'songs':
        this.getSongs();
    }
  }

  protected async getShows(){
    if (!this.shows){
      this.shows = await this.data.getShowIndex();
    }
  }

  protected async getVenues(){
    if (!this.venues){
      this.venues = await this.data.getVenueIndex();
    }
  }

  protected async getLocations(){
    if (!this.locations){
      this.locations = await this.data.getLocationIndex();
    }
  }

  protected async getSongs(){
    if (!this.songs){
      this.songs = await this.data.getSongIndex();
    }
  }

}
