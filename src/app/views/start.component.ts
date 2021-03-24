import { Component } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { EMAILADDRESS } from '../config';
import { AnchorScrollService } from '../services/anchor-scroll.service';
import { CookieService } from 'ngx-cookie-service'; 


declare let gtag: Function;

@Component({
  selector: 'gd-start',
  templateUrl: './start.component.html'
})
export class StartComponent {

  public currentUser: any = { userName: '', userId: 'None' };
  public email: string;
  public showNote: boolean;
  
  constructor(private sanitizer: DomSanitizer,
    public auth: AuthService, public anchor: AnchorScrollService, private cookieService: CookieService) {}

  ngOnInit() {
    const note = this.cookieService.get('gd-note')
    if (note == 'false') {
      this.showNote = false;
    } else {
      this.showNote = true;
    }

    

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
      loggerthis.currentUser);
    }
    */

    this.email = EMAILADDRESS;

  }

  closeNote(){
    this.showNote = false;
    //const d = new Date();
    //d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    //this.cookieService.set('gd-note', 'false', d, '/');  // why no working?? :(
  }



}
