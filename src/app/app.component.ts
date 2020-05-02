import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // https://itnext.io/angular-8-how-to-use-cookies-14ab3f2e93fc

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {
  protected start: Boolean;
  private cookieValue: string;
  

  constructor(router:Router, private cookieService: CookieService) {
    router.events.forEach((event) => {
      if (router.url.includes('/start')) {  
        this.start = true; 
      } else {
        this.start = false; 
      }
    });
  }

  public ngOnInit(): void {
    if (!this.cookieService.check('gd-cookie')){
      const v = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      this.cookieService.set('gd-cookie', v);
      this.cookieValue = this.cookieService.get('gd-cookie');
    } 
  }


}
