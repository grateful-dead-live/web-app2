import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DeadEventDetails, Artifact, SongInfo, ArtifactType, Recording, AudioTrack } from '../services/types';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';
import { PlayerService } from '../services/player.service';
import { AuthService } from '../auth.service';
import { LightboxService } from '../services/lightbox.service';
import { logger } from '../globals';

declare let gtag: Function;

@Component({
  selector: 'gd-show',
  templateUrl: './show.component.html',
  styleUrls:['./show.component.sass']
})
export class ShowComponent {
  
  public event: DeadEventDetails;
  protected recordingUrls: SafeStyle[];
  //protected photos: string[];
  protected photos: Artifact[];
  protected artifacts: Artifact[];
  protected eventImage: string;
  public currentUser: any = { userName: '', userId: 'None' };
  protected formatDate: string;
  public photosLightbox: any;
  public currentArtifact: Artifact;
  public artifactsLightbox: any;
  public imageObject: any;
  protected tilts: Number[];
  
  constructor(private data: DataService, private sanitizer: DomSanitizer,
    private router: Router, private route: ActivatedRoute,
    private dialog: DialogService, private player: PlayerService, public auth: AuthService, 
    private changeDetectorRef: ChangeDetectorRef, private lightbox: LightboxService) {

    }

    async ngOnInit() {
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
      this.currentUser = { userName: '', userId: ''}
      if (this.route.snapshot.data['loggedIn']) {
        this.auth.userProfile$.subscribe(userProfile => {
          this.currentUser = this.resolve.getUser(userProfile);
        });
        logger(this.currentUser);
      }*/
      
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.event = await this.data.getEventDetails(params.get('id'));
      }
      else {
        this.router.navigate(['/mapselect'], { replaceUrl: true });
      }

      if (this.event.date) {
        this.tilts = this.getTilts();
        this.formatDate = this.data.formatDate(this.event.date);
        this.recordingUrls = this.event.recordings.map(r => 
          this.sanitizer.bypassSecurityTrustResourceUrl("https://archive.org/embed/"+r.etreeId+"&playlist=1")
        );
        logger(this.event)
        this.photos = this.event.artifacts
          .filter(a => a.type === ArtifactType.Photo)//.map(a => a.image);
        this.artifacts = this.event.artifacts.filter(a => a.type !== ArtifactType.Photo);
        const poster = this.event.artifacts.filter(a => a.type == ArtifactType.Poster)[0];
        const pass = this.event.artifacts.filter(a => a.type == ArtifactType.Pass)[0];
        const ticket = this.event.artifacts.filter(a => a.type == ArtifactType.Ticket)[0];
        this.eventImage = this.photos.length ? this.photos[0].image
          : poster ? poster.image : pass ? pass.image : ticket ? ticket.image
          : this.event.location.thumbnail;
        var gl;
        if (this.photos.length>0) {
          gl = this.lightbox.makeGallery(this.photos);
          this.photosLightbox = gl[0];
          this.photos = gl[1];

        //this.imageObject = this.lightbox.makeGallery2(this.photos);

        } 
        if (this.artifacts.length) {
          gl = this.lightbox.makeGallery(this.artifacts);
          this.artifactsLightbox = gl[0];
          this.artifacts = gl[1];
          this.currentArtifact = this.artifacts[0];
          logger(this.currentArtifact);
        }
        this.changeDetectorRef.detectChanges();

        
        

      } else {
        //this.router.navigate(['/show', await this.data.getRandomEventId()],
        this.router.navigate(['/mapselect'], { replaceUrl: true });
      }
      
    });
  }


  private getTilts(){
    var t = [];
    for (var i = -30; i <= 30; i++) {
      t.push(i);
    }

    const shuffle = arr => 
      [...arr].reduceRight((res,_,__,s) => 
      (res.push(s.splice(0|Math.random()*s.length,1)[0]), res),[]);

    return shuffle(t);
  }


  /*
  protected openSongOptionsDialog(song: SongInfo, set: string, idx: number) {
    this.dialog.openMultiFunction(
      //song.name+"', "+this.event.venue.name+", "+this.event.date,
      set + "/Track " + idx + ": " + '"'+song.name+'"',
      ["add to playlist", "go to song"],
      [() => this.addSongToPlaylist(song),
        () => this.router.navigate(['/song', song.id])]
    );
  }
*/

  protected openSongOptionsDialog(song: SongInfo, set: string, idx: number) {
    this.dialog.openMultiFunction(
      //song.name+"', "+this.event.venue.name+", "+this.event.date,
      set + "/Track " + idx + ": " + '"'+song.name+'"',
      ["add to playlist", "go to song"],
      [() => this.openRecordingsDialog(song),
        () => this.router.navigate(['/song', song.id])]
    );
  }


  private openRecordingsDialog(song: SongInfo) {
    this.dialog.openMultiFunction(
      "Recordings of '"+song.name+"', "+this.event.venue+", "+this.event.date,
      this.event.recordings.map(r => r.etreeId),
      this.event.recordings.map(r => () => this.addTrackToPlaylist(song, r.etreeId, r.id))
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
  
  /*
  private async addSongToPlaylist(song: SongInfo) {
    const info = await this.data.getEventInfo(this.event.id);
    const track = await this.data.getTrack(song, info);
    if (track) this.player.addToPlaylist(track);
  }


 private async addSongToPlaylist(song: SongInfo) {
  const info = await this.data.getEventInfo(this.event.id);
  const track = await this.data.getTrack(song, info);
  if (track) this.player.addToPlaylist(track);
}
  */



private async addTrackToPlaylist(song: SongInfo, recordingEtreeId: string, recordingId: string) {
  const eventInfo = { 
    id: this.event.id,
    date: this.event.date,
    location: this.event.location.name,
    state: '',
    venue: this.event.venue.name,
    recordings: this.event.recordings,
    artifacts: null //this.artifacts
  }
  var songDetails = await this.data.getSong(song.id);
  this.data.getTracks(songDetails, eventInfo, recordingEtreeId, recordingId)
    .forEach(t => this.player.addToPlaylist(t));
}
  /*
  private async addRecordingToPlaylist(recording: Recording) {
    const info = await this.data.getEventInfo(this.event.id);
    const tracks = await this.data.getRecordingTracks(recording, info);
    if (tracks) tracks.forEach(t => this.player.addToPlaylist(t));
  }
*/

  private async addRecordingToPlaylist(recording: Recording) {
    //const info = await this.data.getEventInfo(this.event.id);
    var tracklist = await this.data.getTracklist(recording.id);
    tracklist.forEach(t =>{  // format to Audiotrack, take first song_id for now
      if (t.song) {
        t['id'] = t.song[0].song_id;
        delete t.song;
      }
      t.track = t.track.toString();
    })
    //logger(tracklist)
    if (tracklist) tracklist.forEach(t => this.addRecordingTrackToPlaylist(t, recording));
  }

  private async addRecordingTrackToPlaylist(audio: AudioTrack, recording: Recording) {
    //logger(audio)
    const track = this.data.toPlayerTrack(this.event.venue.name, 
                                          this.event.location.name, 
                                          this.event.date, 
                                          this.event.id,
                                          recording.etreeId,
                                          audio,
                                          recording.id
                                          );
    this.player.addToPlaylist(track);
  }


  onClickArtifact(a){
    this.lightbox.openLightboxArray(this.artifactsLightbox, a.index)
  }

  onClickPhoto(p){
    this.lightbox.openLightboxArray(this.photosLightbox, p.index)
  }


  tilt(i, t){
    var tl = this.tilts.length;
    //if (tl > 0) {
    //  while (i > tl){
    //    i = i - tl + 1
    //  }
    //}  
    i = (i%tl-1 + tl-1)%tl-1; // wrap index around list length

    if (t == 'artifact') {
      i = tl - i - 1
    }
    //console.log(i +' ' + this.tilts[i]);
    return this.tilts[i];
    
  }

}
