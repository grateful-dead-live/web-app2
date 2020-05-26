import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.sass']
})
export class CookieBannerComponent implements OnInit {

public constructor(@Inject('document') private document,
            @Inject('window') private window) {
}

public showBanner: Boolean;


public ngOnInit() {
  const consent = this.getCookie('gd-cookieconsent');
  if (consent === 'allow') {
    this.showBanner = false;
  } else {
    this.showBanner = true;
  }
}

  private getCookie(cname) {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  private setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    this.document.cookie = cname + '=' + cvalue + ';' + expires;
  }

  public agreeToShare() {
    this.setCookie('gd-cookieconsent', 'allow', 365);
    this.window.location.reload();
  }

}
