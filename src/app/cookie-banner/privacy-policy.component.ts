import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; 
import { TRACKINGID } from '../config'

@Component({
  selector: 'privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.sass']
})
export class PrivacyPolicyComponent implements OnInit {

  public constructor(private cookieService: CookieService,
              @Inject('window') private window) {
  }

  public showBanner: Boolean;


  public ngOnInit() {
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
