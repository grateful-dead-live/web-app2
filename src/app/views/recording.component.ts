import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { RecordingDetails, DeadEventInfo, SongInfo, AudioTrack } from '../services/types';
import { PlayerService } from '../services/player.service';
import { DialogService } from '../services/dialog.service';
import { AuthService } from '../auth.service';

declare let gtag: Function;

@Component({
  selector: 'gd-recording',
  templateUrl: './recording.component.html'
})
export class RecordingComponent {
  protected recording: RecordingDetails;
  protected event: DeadEventInfo;
  protected currentUser: any = { userName: '', userId: ''};
  
  constructor(protected data: DataService, private router: Router,
    private route: ActivatedRoute, private dialog: DialogService,
    private player: PlayerService, public auth: AuthService) {

      

    }

  ngOnInit() {
    this.auth.userProfile$.subscribe(userProfile => {
      if (userProfile){
        this.currentUser = {
          userId: userProfile.sub.split("|")[1],
          userName: userProfile['http://example.com/username']
        }
        gtag('set', {'user_id': this.currentUser.userId});
      }
    });
    /*
    if (this.route.snapshot.data['loggedIn']) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.currentUser = this.resolve.getUser(userProfile);
      });
      console.log(this.currentUser);
    }
    */
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.recording = await this.data.getRecording(params.get('id'));
        this.event = await this.data.getEventInfoForRecording(this.recording.id);
        console.log(this.recording)
        console.log(this.event)
      }
      if (!this.recording) {
        this.router.navigate(['/recording', (await this.data.getRandomRecording()).id],
          { replaceUrl: true });
      }
    });
  }
  
  protected openTrackOptionsDialog(audio: AudioTrack) {
    this.recording.tracks
    this.dialog.openMultiFunction(
      //song.name+"', "+this.event.venue.name+", "+this.event.date,
      audio.track + " " + audio.title,
      ["add to playlist"],
      [() => this.addTrackToPlaylist(audio)]
    );
  }
  
  private async addTrackToPlaylist(audio: AudioTrack) {
    const info = await this.data.getEventInfo(this.event.id);
    const track = await this.data.getTrackFromAudio(audio, info, this.recording.etreeId);
    if (track) this.player.addToPlaylist(track);
  }
}
