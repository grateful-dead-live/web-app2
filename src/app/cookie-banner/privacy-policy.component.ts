import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; 

@Component({
  selector: 'privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.sass']
})
export class PrivacyPolicyComponent implements OnInit {

public constructor(@Inject('document') private document, private cookieService: CookieService,
            @Inject('window') private window) {
}

public showBanner: Boolean;


public ngOnInit() {
}

public removeCookie() {
    this.document.cookie = 'gd-cookieconsent= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    this.cookieService.delete('gd-cookie');
    this.window.location.reload();
  }

}
