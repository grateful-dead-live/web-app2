import { Component, Input } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';

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


  async delTrack(i){
    this.player.playlist.splice(i, 1);
    console.log(i);
  }

  async onSavePlaylist() {
    //console.log(this.makeid())
    //console.log(this.currentUser.userId)
    //await this.data.addPlaylist(0, 'a', this.currentUser.userId);
    this.dialog.openInputDialog(name => {
      if (name) { 
        
        this.savePlaylist(name);
      }
    });
  }

  async savePlaylist(name){
    console.log('saving playlist');
    const id = this.makeid();
    await this.data.addPlaylist(this.player.playlist, id, this.currentUser.userId)
    

  }

  private makeid() {
    var result           = '';
    var characters       = 'abcdef0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 24; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
}
