import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data.service';

@Component({
  selector: 'gd-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.sass']
})
export class LocationComponent {
  protected location;
  
  constructor(protected data: DataService, private titleService: Title) {}
  
  async ngOnInit() {
    this.location = await this.data.getLocation();
    this.titleService.setTitle(this.location.name);
  }
}
