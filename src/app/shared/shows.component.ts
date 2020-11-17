import { Component, Input, SimpleChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { DeadEventInfo } from '../services/types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'gd-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.sass']
})
export class ShowsComponent {
  @Input() eventIds: string[];
  @Input() onOptions: (s: DeadEventInfo) => any;
  public events: DeadEventInfo[];
  public p: number = 1;
  public pageNum = new FormControl('');
  public pages: number;
  
  constructor(private data: DataService) {}
  
  ngOnInit() {
    //this.events = await this.data.getEventInfos(this.eventIds);
    //this.pages = Math.ceil(this.events.length/10)
  }

  async refresh() {
    this.events = await this.data.getEventInfos(this.eventIds);
    this.pages = Math.ceil(this.events.length/10)
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'eventIds': {
            this.refresh();
          }
        }
      }
    }
  }

  goToPage(n){
    var no = parseInt(n.value);
    if (no > this.pages) no = this.pages;
    this.p = no;
  }

  keyPress(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
}
