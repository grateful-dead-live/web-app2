import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

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

  constructor(private data: DataService) { }

  ngOnInit(): void {
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
    this.shows = await this.data.getShowIndex();
  }

  protected async getVenues(){
    this.venues = await this.data.getVenueIndex();
  }

  protected async getLocations(){
    this.locations = await this.data.getLocationIndex();
  }

  protected async getSongs(){
    this.songs = await this.data.getSongIndex();
  }

}
