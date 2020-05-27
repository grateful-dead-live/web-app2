import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DeadEventDetails, Artifact, SongInfo, ArtifactType, Recording } from '../services/types';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';
import { PlayerService } from '../services/player.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'gd-show',
  templateUrl: './show.component.html'
})
export class ShowComponent {
  
  protected event: DeadEventDetails;
  protected recordingUrls: SafeStyle[];
  //protected photos: string[];
  protected photos: Artifact[];
  protected artifacts: Artifact[];
  protected eventImage: string;
  protected currentUser: any = { userName: '', userId: ''};
  
  constructor(private data: DataService, private sanitizer: DomSanitizer,
    private router: Router, private route: ActivatedRoute,
    private dialog: DialogService, private player: PlayerService, public auth: AuthService) {

      
    }

    async ngOnInit() {
      this.auth.userProfile$.subscribe(userProfile => {
        if (userProfile){
          this.currentUser = {
            userId: userProfile.sub.split("|")[1],
            userName: userProfile['http://example.com/username']
          }
        }
      });
      
      /*
      this.currentUser = { userName: '', userId: ''}
      if (this.route.snapshot.data['loggedIn']) {
        this.auth.userProfile$.subscribe(userProfile => {
          this.currentUser = this.resolve.getUser(userProfile);
        });
        console.log(this.currentUser);
      }*/
      
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.event = await this.data.getEventDetails(params.get('id'));
        this.event.date = this.data.formatDate(this.event.date);
        this.recordingUrls = this.event.recordings.map(r => 
          this.sanitizer.bypassSecurityTrustResourceUrl("https://archive.org/embed/"+r.etreeId+"&playlist=1")
        );
        this.photos = this.event.artifacts
          .filter(a => a.type === ArtifactType.Photo)//.map(a => a.image);
        this.artifacts = this.event.artifacts.filter(a => a.type !== ArtifactType.Photo);
        const poster = this.event.artifacts.filter(a => a.type == ArtifactType.Poster)[0];
        const pass = this.event.artifacts.filter(a => a.type == ArtifactType.Pass)[0];
        const ticket = this.event.artifacts.filter(a => a.type == ArtifactType.Ticket)[0];
        this.eventImage = this.photos.length ? this.photos[0].image
          : poster ? poster.image : pass ? pass.image : ticket ? ticket.image
          : this.event.location.thumbnail;
        console.log(this.event)
      } else {
        this.router.navigate(['/show', await this.data.getRandomEventId()],
          { replaceUrl: true });
      }
    });
  }
  
  protected openSongOptionsDialog(song: SongInfo, set: string, idx: number) {
    this.dialog.openMultiFunction(
      //song.name+"', "+this.event.venue.name+", "+this.event.date,
      set + "/Track " + idx + ": " + '"'+song.name+'"',
      ["add to playlist", "go to song"],
      [() => this.addSongToPlaylist(song),
        () => this.router.navigate(['/song', song.id])]
    );
  }
  
  protected openRecordingOptionsDialog(recording: Recording) {
    this.dialog.openMultiFunction(
      "Recording "+recording.etreeId,
      ["add all to playlist", "go to recording"],
      [() => this.addRecordingToPlaylist(recording),
        () => this.router.navigate(['/recording', recording.id])]
    );
  }
  
  private async addSongToPlaylist(song: SongInfo) {
    const info = await this.data.getEventInfo(this.event.id);
    const track = await this.data.getTrack(song, info);
    if (track) this.player.addToPlaylist(track);
  }
  
  private async addRecordingToPlaylist(recording: Recording) {
    const info = await this.data.getEventInfo(this.event.id);
    const tracks = await this.data.getRecordingTracks(recording, info);
    if (tracks) tracks.forEach(t => this.player.addToPlaylist(t));
  }

}
