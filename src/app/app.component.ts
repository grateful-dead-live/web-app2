import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
  protected currentUser: any = { userName: '', userId: '' };

  constructor(public router:Router, public auth: AuthService) {
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
    
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd && TRACKING){
          if (this.currentUser.userId != '') gtag('set', {'user_id': this.currentUser.userId});
          else gtag('set', {'user_id': undefined});
          gtag('config', TRACKINGID, 
                {
                  'page_path': event.urlAfterRedirects
                }
               );
       }
    }); 


  }

  public ngOnInit() {
    
  }


}
