import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Artifact, ArtifactType } from '../services/types';
import { AuthService } from '../auth.service';
import { DEBUG } from '../config';

if (DEBUG) {console.log = function(){}};

declare let gtag: Function;

@Component({
  selector: 'gd-artifacts',
  templateUrl: './artifacts.component.html'
})
export class ArtifactsComponent {
  
  public artifacts: Artifact[];
  protected types: ArtifactType[];
  protected currentUser: any = { userName: '', userId:''};
  
  constructor(protected data: DataService, private route: ActivatedRoute, public auth: AuthService) {

   
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
    if (this.route.snapshot.data['loggedIn']) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.currentUser = this.resolve.getUser(userProfile);
      });
      console.log(this.currentUser);
    }
    */

    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        //show fullscreen artifact
      } else if (params.has('types')) {
        this.types = JSON.parse(params.get('types'));
        this.artifacts = await this.data.getRandomArtifacts(this.types, 6);
      } else {
        this.artifacts = await this.data.getRandomArtifacts(null, 6);
        console.log(this.artifacts)
      }
    });
  }
}
