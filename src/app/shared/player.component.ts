import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'gd-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent {
  protected loaded = false;
  protected minimized = false;
  
  constructor(protected player: PlayerService, private data: DataService) {}
  
  async addRandomTrack() {
    this.player.addToPlaylist(await this.data.getRandomTrack());
  }

  volumeChange(v){
    this.player.volume(v);
  }
}
