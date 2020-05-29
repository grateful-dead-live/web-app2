import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; // https://itnext.io/angular-8-how-to-use-cookies-14ab3f2e93fc

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.sass']
})
export class CookieBannerComponent implements OnInit {

public constructor(private cookieService: CookieService,
            @Inject('window') private window) {
}

public showBanner: Boolean;

public ngOnInit() {
  const consent = this.cookieService.get('gd-cookieconsent')
  if (consent == 'allow') {
    this.showBanner = false;
  } else {
    this.showBanner = true;
  }
}

  private setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    this.cookieService.set(cname, cvalue, d, '/');
  }

  public agreeToShare() {
    this.setCookie('gd-cookieconsent', 'allow', 365);
    this.window.location.reload();
  }

}
