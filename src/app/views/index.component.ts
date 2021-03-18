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
  protected venuesSort: String = 'venueName';
  protected showsSort: String = 'date';
  protected locationsSort: String = 'locationName';
  protected songsSort: String = 'songName';
  public index: any;
  public spinTime: boolean;

  constructor(private data: DataService, public auth: AuthService) { }

  async ngOnInit() {
    setTimeout(() => {
      this.spinTime = true;
    }, 2000);
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

    this.index = await this.data.getIndex();
    this.shows = this.index.shows;
    this.venues = this.index.venues;
    this.songs = this.index.songs;
    this.locations = this.index.locations;
  }

  public onSelectButton(s) {
    this.selected = s;
    /*
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
    */
  }

  /*
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
  */

  public onClickTitle(selection, column) {
    switch(selection) {
      case 'shows':
        if (this.showsSort == column) this.shows.reverse();
        else this.shows = this.sortByKey(this.shows, column);
        this.showsSort = column;
        break;
      case 'venues':
        if (this.venuesSort == column) this.venues.reverse();
        else this.venues = this.sortByKey(this.venues, column);
        this.venuesSort = column;
        break;
      case 'locations':
        if (this.locationsSort == column) this.locations.reverse();
        else this.locations = this.sortByKey(this.locations, column);
        this.locationsSort = column;
        break;
      case 'songs':
        if (this.songsSort == column) this.songs.reverse();
        else this.songs = this.sortByKey(this.songs, column);
        this.songsSort = column;
    }
  }

  protected sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

}
