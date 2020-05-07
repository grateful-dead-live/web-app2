import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userId: string;

  constructor(public auth: AuthService, private data: DataService) { }

  ngOnInit() {
    this.auth.userProfile$.subscribe(userProfile => {
      this.currentUser = userProfile;
      this.userId = this.currentUser.sub.split("|")[1]; 
    });
    console.log(this.userId);
  }

  async onButton(d){
    var result = await this.data.testPostMongo(this.userId, d);
    console.log(result);
  }

  async onButton2(){
    var result = await this.data.testDelMongo(this.userId);
    console.log(result);
  }

}