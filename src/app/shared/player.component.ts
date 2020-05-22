import { Component, Input } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';
import { AuthService } from '../auth.service';
import { APIResolver } from '../auth.resolve';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gd-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent {
  @Input() protected currentUser: any;
  protected loaded = false;
  protected minimized = false;
  constructor(protected player: PlayerService, private data: DataService, private dialog: DialogService) {}
  
  ngOnInit() {
   
  }

  async addRandomTrack() {
    this.player.addToPlaylist(await this.data.getRandomTrack());
  }

  volumeChange(v){
    this.player.volume(v);
  }

  async savePlaylist(userid){
    console.log(this.player.playlist);
  }

  async delTrack(i){
    this.player.playlist.splice(i, 1);
    console.log(i);
  }

  protected onSavePlaylist() {
    console.log(this.currentUser.userId)
    this.dialog.openInputDialog();
  }
}
