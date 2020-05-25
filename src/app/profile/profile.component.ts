import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataService } from '../services/data.service';
import { APIResolver } from '../auth.resolve';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  constructor(public auth: AuthService, private data: DataService, public resolve: APIResolver, private route: ActivatedRoute, 
    private dialog: DialogService, private player: PlayerService) { }

  protected currentUser: any;
  //protected authenticated: boolean;
  protected userProfile: any;
  protected bookmarks: any;
  protected comments: any;
  protected playlists: any;
  protected showPlaylistInfo: boolean = false;

  ngOnInit() {
    if (this.route.snapshot.data['loggedIn']) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.userProfile = userProfile;
        this.currentUser = this.resolve.getUser(userProfile);
        this.getBookmarks();
        this.getComments()
        this.getPlaylists();
      });
    }

/*
    if (this.authenticated == true) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.currentUser = userProfile;
        this.userId = this.currentUser.sub.split("|")[1];
        this.userName = this.currentUser['http://example.com/username'];
      });
    console.log(this.userId)
    }*/
  }

  async getBookmarks(){
    var result = await this.data.getBookmarks(this.currentUser.userId);
    if (result[0].bookmarks) {
      var b = result[0].bookmarks;
      b.sort(function(a, b) { return a.timestamp - b.timestamp }).reverse();
      b.forEach(i => i.timestamp = this.formatTime(new Date(Number(i.timestamp))));
      this.bookmarks = b;
    };
  }

  async getComments(){
    var result = await this.data.getUserComments(this.currentUser.userId);
    if (result[0].comments) {
      var res = [];
      result[0].comments.forEach(r => {
        if (!(res.some(res => res.title === r.title) && res.some(res => res.route === r.route))){
          res.push({'title': r.title, 'route': r.route});
        }        
      })
      this.comments = res;
      //this.comments = result[0].comments;
    };
  }

  formatTime(d) {
    function z(n){return (n<10?'0':'')+n}
    return z(d.getMonth()+1) + '-' + z(d.getDate()) + '-' + (d.getYear()+1900) + ' ' +  d.getHours() + ':' + z(d.getMinutes());
  }

  delPlaylist(playlistid, name) {
    this.dialog.openMultiFunction(
      'Are you sure you want to delete playlist "' + name + '"?',
      ["yes", "no"],
      [() => {
        this.data.delPlaylist(this.currentUser.userId, playlistid);
        this.getPlaylists();
      },
        () => null]
    );
  }

  async getPlaylists(){
    var result = await this.data.getPlaylists(this.currentUser.userId);
    if (result[0].length){
      var p = result[0].playlists;
      p.sort(function(a, b) { return a.timestamp - b.timestamp }).reverse();
      p.forEach(i => i.timestamp = this.formatTime(new Date(Number(i.timestamp))));
      this.playlists = p; 
    }
  }

  async loadPlaylist(playlist) {
    this.dialog.openMultiFunction(
      'Your current playlist will be lost',
      ["ok", "cancel"],
      [() => this.player.playlist = [...playlist],
        () => {}]
    );
  }

  protected onDeleteBookmark(bookmark) {
    this.dialog.openMultiFunction(
      "Are you sure you want to delete this bookmark?",
      ["yes", "no"],
      [() => this.deleteBookmark(bookmark), 
        () => null]
    );
  }

  async deleteBookmark(bookmark){
    await this.data.delBookmark(this.currentUser.userId, bookmark.route);
    this.getBookmarks();
  }

}