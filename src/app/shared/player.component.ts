import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'gd-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent {
  constructor(protected player: PlayerService) {}
}
