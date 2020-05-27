import { Component } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { APIResolver } from '../auth.resolve';
import { EMAILADDRESS } from '../config'

@Component({
  selector: 'gd-start',
  templateUrl: './start.component.html'
})
export class StartComponent {
  part1: String;
  part2: String;
  part3: String;
  part4: String;
  part5: String;
  part6: String;
  part7: String;

  protected currentUser: any;
  protected email: string;
  
  constructor(private sanitizer: DomSanitizer,
    public auth: AuthService, public resolve: APIResolver) {

      this.auth.userProfile$.subscribe(userProfile => {
        if (userProfile){
          this.currentUser = this.resolve.getUser(userProfile);}
        });

    }

  ngOnInit() {
    /*
    if (this.route.snapshot.data['loggedIn']) {
      this.auth.userProfile$.subscribe(userProfile => {
        this.currentUser = this.resolve.getUser(userProfile);
      });
      console.log(this.currentUser);
    }
    */

    this.email = EMAILADDRESS;

  }

}
