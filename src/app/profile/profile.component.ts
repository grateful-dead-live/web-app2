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
  protected userId: string;
  protected userName: string;
  protected authenticated: boolean;
  protected userProfile: any;

  ngOnInit() {

    this.auth.isAuthenticated$.subscribe(a => {
      this.authenticated = a;
      console.log(this.authenticated);
      if (this.authenticated) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.currentUser = userProfile;
        this.userId = this.currentUser.sub.split("|")[1];
        this.userName = this.currentUser['http://example.com/username'];
        console.log(this.userId)
      });}
    
    });
  
    if (this.route.snapshot.data['loggedIn']) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.userProfile = this.resolve.getUser(userProfile);
      });
      console.log(this.userProfile);
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

  async onButton(userId, d){
    //userId = userId.split('|')[1];
    var result = await this.data.testPostMongo(userId, d);
    console.log(result);
  }

  async onButton2(userId){
    //userId = userId.split('|')[1];
    var result = await this.data.testDelMongo(userId);
    console.log(result);
  }

}