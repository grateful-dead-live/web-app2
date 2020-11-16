import { Component, Input } from '@angular/core';
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
  
  async ngOnInit() {
    this.events = await this.data.getEventInfos(this.eventIds);
    this.pages = Math.ceil(this.events.length/10)
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
