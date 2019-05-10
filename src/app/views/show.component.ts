import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeadEventInfo } from '../dead-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'gd-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent {
  
  protected event: DeadEventInfo;
  
  constructor(private data: DataService, private titleService: Title) {}
  
  async ngOnInit() {
    this.event = await this.data.getEvent();
    console.log(this.event)
    this.titleService.setTitle(this.event.location.name + ", " + this.event.date);
  }

}
