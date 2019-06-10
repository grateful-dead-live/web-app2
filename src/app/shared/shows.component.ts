import { Component, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { DeadEventInfo } from '../services/types';

@Component({
  selector: 'gd-shows',
  templateUrl: './shows.component.html'
})
export class ShowsComponent {
  @Input() eventIds: string[];
  protected events: DeadEventInfo[];
  
  constructor(private data: DataService) {}
  
  async ngOnInit() {
    this.events = await this.data.getEventInfos(this.eventIds);
  }
}
