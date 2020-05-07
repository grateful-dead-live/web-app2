import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  constructor(public auth: AuthService, private data: DataService) { }

  ngOnInit() {
    /*
    this.auth.userProfile$.subscribe(userProfile => {
     this.currentUser = userProfile;
     this.userId = this.currentUser.sub.split("|")[1];
   });
   console.log(this.userId);
   */
  }

  async onButton(userId, d){
    userId = userId.split('|')[1];
    var result = await this.data.testPostMongo(userId, d);
    console.log(result);
  }

  async onButton2(userId){
    userId = userId.split('|')[1];
    var result = await this.data.testDelMongo(userId);
    console.log(result);
  }

}