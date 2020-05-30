import { Component, Input } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';
import { AuthService } from '../auth.service'

declare let gtag: Function;

@Component({
  selector: 'gd-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent {
  protected currentUser: any = { userName: '', userId: '' };
  protected loaded = false;
  protected minimized = false;
  constructor(protected player: PlayerService, private data: DataService, private dialog: DialogService, public auth: AuthService) {}
  
  ngOnInit() {
    //if (this.currentUser.userId != '') gtag('set', {'user_id': this.currentUser.userId});
    this.auth.userProfile$.subscribe(userProfile => {
      if (userProfile){
        this.currentUser = {
          userId: userProfile.sub.split("|")[1],
          userName: userProfile['http://example.com/username']
        }
        gtag('set', {'user_id': this.currentUser.userId});
        this.player.getPlaylists(this.currentUser.userId);
      }
    });
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
    this.dialog.openInputDialog(name => {
      if (name) { 
        this.savePlaylist(name);
      }
    });
  }

  async savePlaylist(name){
    console.log('saving playlist');
    const id = this.makeid();
    await this.data.addPlaylist(name, this.player.playlist, id, this.currentUser.userId, new Date().getTime());
    await this.player.getPlaylists(this.currentUser.userId)
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
