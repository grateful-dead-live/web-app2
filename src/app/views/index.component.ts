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
  constructor(private data: DataService) { }

  ngOnInit(): void {
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
      case 'cities':
        this.getCities();
        break;
      case 'venues':
        this.getSongs();
    }
  }

  protected async getShows(){
    this.shows = await this.data.getShowIndex();
  }

  protected getVenues(){}

  protected getCities(){}

  protected getSongs(){}

}
