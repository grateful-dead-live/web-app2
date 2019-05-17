import { Component, Input } from '@angular/core';
import { DeadEventInfo } from '../services/types';

@Component({
  selector: 'gd-shows',
  templateUrl: './shows.component.html'
})
export class ShowsComponent {
  @Input() events: DeadEventInfo[];
}
