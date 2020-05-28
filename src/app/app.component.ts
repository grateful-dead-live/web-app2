import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // https://itnext.io/angular-8-how-to-use-cookies-14ab3f2e93fc
import { AuthService } from './auth.service';
import { TRACKINGID, TRACKING } from './config';


declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {
  //protected start: Boolean;
  //private cookieValue: string;
  protected currentUser: any;

  constructor(public router:Router, private cookieService: CookieService, public auth: AuthService) {
    //router.events.forEach((event) => {
    //  if (router.url.includes('/about')) {  
    //    this.start = true; 
    //  } else {
    //    this.start = false; 
    //  }
    //});

    
    
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd && TRACKING){
          gtag('config', TRACKINGID, 
                {
                  'page_path': event.urlAfterRedirects
                }
               );
       }
    }); 


  }

  public ngOnInit() {
    this.auth.userProfile$.subscribe(userProfile => {
      if (userProfile){
        this.currentUser = {
          userId: userProfile.sub.split("|")[1],
          userName: userProfile['http://example.com/username']
        }
      }
    });
    

  }


}
