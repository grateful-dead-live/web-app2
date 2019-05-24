import { Component, Input } from '@angular/core';
import { DeadEventInfo } from '../services/types';

@Component({
  selector: 'gd-songs',
  templateUrl: './songs.component.html'
})
export class SongsComponent {
  @Input() events: DeadEventInfo[];
  @Input() audio: DeadEventInfo[];
}
