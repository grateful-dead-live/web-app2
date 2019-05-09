import { Component } from '@angular/core';
import { DeadEventInfo } from '../dead-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'gd-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent {
  
  protected event: DeadEventInfo;
  
  constructor(private data: DataService) {}
  
  async ngOnInit() {
    this.event = await this.data.getEvent();
    console.log(this.event)
  }

}
