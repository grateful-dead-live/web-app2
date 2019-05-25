import { Component, Input } from '@angular/core';
import { DeadEventInfo } from '../services/types';
import { DeadApiService } from '../services/dead-api.service';

@Component({
  selector: 'gd-songs',
  templateUrl: './songs.component.html'
})
export class SongsComponent {
  @Input() events: DeadEventInfo[];
  @Input() audio: [];

  selectedRec: string ;

 
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedRec = event.target.value;
  }


}
