import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataService } from '../services/data.service';
import { APIResolver } from '../auth.resolve';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  constructor(public auth: AuthService, private data: DataService, public resolve: APIResolver, private route: ActivatedRoute) { }

  protected currentUser: any;
  protected authenticated: boolean;
  protected userProfile: any;
  protected bookmarks: any;
  protected bookmarkTypes: any;

  ngOnInit() {
    if (this.route.snapshot.data['loggedIn']) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.userProfile = userProfile;
        this.currentUser = this.resolve.getUser(userProfile);
        this.getBookmarks();
      });
      console.log(this.currentUser);
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
    if (result[0]) {
      var b = []
      result[0].bookmarks.forEach(r => {
        b.push({route: r.route, timestamp: r.timestamp});
      })
      b.sort(function(a, b) { return a.timestamp - b.timestamp }).reverse();
      for (var i in b){
        b[i].timestamp = this.formatTime(new Date(Number(b[i].timestamp)));
      }
      this.bookmarks = b;
    };
    console.log(this.bookmarks)
  }

  async testButton(){
    var result = await this.data.getUserCommentRoutes(this.currentUser.userId);
    console.log(result);
  }

  formatTime(d) {
    function z(n){return (n<10?'0':'')+n}
    return z(d.getMonth()+1) + '-' + z(d.getDate()) + '-' + (d.getYear()+1900) + ' ' +  d.getHours() + ':' + z(d.getMinutes());
  }


}