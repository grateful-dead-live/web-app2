import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { RecordingDetails, DeadEventInfo, AudioTrack, RecordingInfo, Recording } from '../services/types';
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
  public currentUser: any = { userName: '', userId: 'None' };
  protected tracklist: any[];
  public recordinginfo: RecordingInfo;
  public _array = Array;
  public spinTime: boolean;
  
  constructor(protected data: DataService, private router: Router,
    private route: ActivatedRoute, private dialog: DialogService,
    private player: PlayerService, public auth: AuthService) {

      

    }

  ngOnInit() {
    setTimeout(() => {
      this.spinTime = true;
    }, 2000);
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
      loggerthis.currentUser);
    }
    */
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        //this.recording = await this.data.getRecording(params.get('id'));
        //this.event = await this.data.getEventInfoForRecording(this.recording.id);

        //const rec_id = params.get('id');
        this.recordinginfo = await this.data.getRecordingInfo(params.get('id'));
      }
      else {
        this.router.navigate(['/mapselect'], { replaceUrl: true });
      }


      if (params.has('id') && this.recordinginfo) {
        var tracklist = await this.data.getTracklist(params.get('id'));
        tracklist.forEach(t =>{  // format to Audiotrack, take first song_id for now
          if (t.song) {
            t['id'] = t.song[0].song_id;
            delete t.song;
          }
          t.track = t.track.toString();
        })
        this.tracklist = tracklist;
        //logger(this.recordinginfo)
        //loggerthis.tracklist);
      }
      else {
        this.router.navigate(['/mapselect'], { replaceUrl: true });
      }


      /*
      if (!this.recording) {
        this.router.navigate(['/recording', (await this.data.getRandomRecording()).id],
          { replaceUrl: true });
      } */
    });
  }
  
  protected openTrackOptionsDialog(audio: AudioTrack) {    
    if (audio.id) {
      this.dialog.openMultiFunction(
        audio.track + " " + audio.title,
        ["add to playlist", "go to song"], [() => this.addTrackToPlaylist(audio), 
          () => this.router.navigate(['/song', audio.id])]);
    }
    else {
      this.dialog.openMultiFunction(
        audio.track + " " + audio.title,
        ["add to playlist"], [() => this.addTrackToPlaylist(audio)]);
    }
  }
  
  
  /*
  private async addTrackToPlaylist(audio: AudioTrack) {
    loggeraudio.id)
    const info = await this.data.getEventInfo(this.event.id);
    const track = await this.data.getTrackFromAudio(audio, info, this.recording.etreeId);
    if (track) this.player.addToPlaylist(track);
  }
  */

  private async addTrackToPlaylist(audio: AudioTrack) {
    const track = this.data.toPlayerTrack(this.recordinginfo.venue_name, 
                                          this.recordinginfo.location_name, 
                                          this.recordinginfo.date, 
                                          this.recordinginfo.show_id,
                                          this.recordinginfo.etree_id,
                                          audio,
                                          this.recordinginfo.recording_id);
                                          
    this.player.addToPlaylist(track);
  }


  public addAllToPlaylist() {
    if (this.tracklist) this.tracklist.forEach(t => this.addTrackToPlaylist(t));
  }

}
