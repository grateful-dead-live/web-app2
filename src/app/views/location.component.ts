import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'gd-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.sass']
})
export class LocationComponent {
  protected location;
  
  constructor(protected data: DataService) {}
  
  async ngOnInit() {
    this.location = await this.data.getLocation();
    console.log(this.location)
  }
}
