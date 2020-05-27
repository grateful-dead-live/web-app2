import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // https://itnext.io/angular-8-how-to-use-cookies-14ab3f2e93fc
import { AuthService } from './auth.service';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {
  protected start: Boolean;
  private cookieValue: string;
  protected currentUser: any;

  constructor(router:Router, private cookieService: CookieService, public auth: AuthService) {
    //router.events.forEach((event) => {
    //  if (router.url.includes('/about')) {  
    //    this.start = true; 
    //  } else {
    //    this.start = false; 
    //  }
    //});

    this.auth.userProfile$.subscribe(userProfile => {
      if (userProfile){
        this.currentUser = {
          userId: userProfile.sub.split("|")[1],
          userName: userProfile['http://example.com/username']
        }
      }
    });

    /*
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
    */

  }

  public ngOnInit(): void {/*
    if (!this.cookieService.check('gd-cookie')){
      const v = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      this.cookieService.set('gd-cookie', v);
      this.cookieValue = this.cookieService.get('gd-cookie');
    } */
  }


}
