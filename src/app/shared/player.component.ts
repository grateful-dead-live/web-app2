import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'gd-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent {
  protected loaded = false;
  protected minimized = false;
  
  constructor(protected player: PlayerService, private data: DataService, private dialog: DialogService) {}
  
  async addRandomTrack() {
    this.player.addToPlaylist(await this.data.getRandomTrack());
  }

  volumeChange(v){
    this.player.volume(v);
  }

  async savePlaylist(){
    console.log(this.player.playlist);
  }

  async delTrack(i){
    this.player.playlist.splice(i, 1);
    console.log(i);
  }

  protected openRecordingOptionsDialog() {
    this.dialog.openInputDialog();
  }
}
