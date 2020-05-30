import { Component } from '@angular/core';
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

  async onLoadPlaylist() {
    console.log('load playlist')
    this.loadPlaylist()
  }

  async savePlaylist(name){
    console.log('saving playlist');
    const id = this.makeid();
    await this.data.addPlaylist(name, this.player.playlist, id, this.currentUser.userId, new Date().getTime());
    await this.player.getPlaylists(this.currentUser.userId);
  }
/*

protected openOptionsDialog(event: DeadEventInfo) {
    this.dialog.openMultiFunction(
      this.song.name+"', "+event.venue+", "+event.date,
      ["Add to playlist", "Go to show"],
      [() => this.openRecordingsDialog(event),
        () => this.router.navigate(['/show', event.id])]
    );
  }

  private openRecordingsDialog(event: DeadEventInfo) {
    this.dialog.openSingleFunction(
      "Recordings of '"+this.song.name+"', "+event.venue+", "+event.date,
      event.recordings.map(r => r.etreeId),
      r => this.addRecordingToPlaylist(r, event)
    );
  }
  */
 
  private loadPlaylist() {
    this.dialog.openMultiFunction(
      'Your current playlist will be lost',
      this.player.playlists.map(r => r.name),
      this.player.playlists.map(r => () => {this.player.playlist = [...r.playlist]})
    );
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
