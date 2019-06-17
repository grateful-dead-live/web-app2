import { Component, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { DeadEventInfo } from '../services/types';

@Component({
  selector: 'gd-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.sass']
})
export class ShowsComponent {
  @Input() eventIds: string[];
  @Input() onOptions: (s: DeadEventInfo) => any;
  protected events: DeadEventInfo[];
  
  constructor(private data: DataService) {}
  
  async ngOnInit() {
    this.events = await this.data.getEventInfos(this.eventIds);
    //TODO add pagination?
    if (this.events) this.events = this.events.slice(0, 20);
  }
}
