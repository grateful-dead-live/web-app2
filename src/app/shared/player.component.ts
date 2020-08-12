import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';

declare let gtag: Function;

@Component({
  selector: 'gd-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent {
  public currentUser: any = { userName: '', userId: '' };
  public loaded = false;
  public minimized = false;
  constructor(public player: PlayerService, private data: DataService, private dialog: DialogService, public auth: AuthService, 
              public router: Router) {} //, private cookieService: CookieService) {}
  
  ngOnInit() {
    //if (!this.cookieService.get('auth0.is.authenticated')) { 
    //  this.player.removePlaylistFromStorage() ;
    //};
    
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
      if (!this.router.url.startsWith('/playlist')) {
        this.player.loadPlaylistFromsStorage();
      };
      
    });

    
    
  }

  async addRandomTrack() {
    this.player.addToPlaylist(await this.data.getRandomTrack());
  }

  volumeChange(v){
    this.player.volume(v);
  }

  async onClearPlaylist(){
    this.player.clearPlaylist();
    this.minimized = true;
  }

  async delTrack(i){
    this.player.deleteFromPlaylist(i);
  }

  async onSavePlaylist() {
    this.dialog.openInputDialog(name => {
      if (name) { 
        this.savePlaylist(name);
      }
    });
  }

  async onLoadPlaylist() {
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
    console.log('load playlist');
    this.dialog.openMultiFunction(
      'Your current playlist will be lost',
      this.player.playlists.map(r => r.name),
      this.player.playlists.map(r => () => {
        this.player.playlist = [...r.playlist];
        this.player.storePlaylist();
      })
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
