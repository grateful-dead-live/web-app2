import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; 
import { TRACKINGID } from '../config';
import { AnchorScrollService } from '../services/anchor-scroll.service';
import { AuthService } from '../auth.service';

declare let gtag: Function

@Component({
  selector: 'privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.sass']
})
export class PrivacyPolicyComponent implements OnInit {

  public constructor(private cookieService: CookieService, public anchor: AnchorScrollService, public auth: AuthService,
              @Inject('window') private window) {
  }

  public showBanner: Boolean;
  public currentUser: any = { userName: '', userId: 'None' };


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

    this.anchor.listen();
  }

  public removeCookie() {
      this.cookieService.delete('gd-cookieconsent');
      this.cookieService.delete('_ga');
      this.cookieService.delete('_gid');
      this.cookieService.delete('_gat_gtag_' + TRACKINGID.replace(/-/g, '_'));
      this.window.location.reload();
  }

  private setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    this.cookieService.set(cname, cvalue, d);
  }

  public agreeToShare() {
    this.setCookie('gd-cookieconsent', 'allow', 365);
    this.window.location.reload();
  }


}
