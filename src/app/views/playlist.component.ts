import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { PlayerService } from '../services/player.service';
import { AuthService } from '../auth.service';

declare let gtag: Function;

@Component({
  selector: 'gd-playlist',
  templateUrl: './playlist.component.html'
})
export class PlaylistComponent {

  public currentUser: any = { userName: '', userId:'' };
  public playlist: any;
  public shareUsername: string;
  protected playlistId: string;

  constructor(private data: DataService,  private router: Router, private route: ActivatedRoute,
    private player: PlayerService, public auth: AuthService) {}

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

      this.route.paramMap.subscribe(async params => {
        if (params.has('id')) {
          this.getPlaylist(params.get('id'));
        }
      });

    }

    async getPlaylist(playlistId){
      //playlistId = '6181aba048dc0b94d09e8664';
      const res = await this.data.getPlaylist(playlistId);
      this.playlist = res.playlists[0];
      console.log(this.playlist);
      this.player.playlist = [...this.playlist.playlist];
    }
  }