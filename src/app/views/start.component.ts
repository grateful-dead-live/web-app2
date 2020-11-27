import { Component } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { EMAILADDRESS, DEBUG } from '../config';
import { AnchorScrollService } from '../services/anchor-scroll.service';

console.log = function(s){
  if (DEBUG) {
    console.warn(s);
  }; 
};


declare let gtag: Function;

@Component({
  selector: 'gd-start',
  templateUrl: './start.component.html'
})
export class StartComponent {

  public currentUser: any = { userName: '', userId: 'None' };
  public email: string;
  
  constructor(private sanitizer: DomSanitizer,
    public auth: AuthService, public anchor: AnchorScrollService) {

      

    }

  ngOnInit() {

    this.anchor.listen();
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

    this.email = EMAILADDRESS;

  }

}
