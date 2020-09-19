import { Component, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';
import { TRACKINGID, TRACKING, SOCKETIO } from './config';
import { DOCUMENT } from '@angular/common';
import { PlayerService } from './services/player.service';
import { SocketioService } from './services/socketio.service';

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

  constructor(public router:Router, public auth: AuthService, @Inject(DOCUMENT) private doc: any, private player: PlayerService,
    private socketService: SocketioService) {
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
        gtag('set', {'user_id': this.currentUser.userId});
      }
    });
    
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
    if (SOCKETIO) this.socketService.setupSocketConnection();
    this.googleAnalytics();
  }


  private scriptHtml(html, src){
    const s = this.doc.createElement('script');
    s.type = 'text/javascript';
    if (src) s.src = src;
    if (html) s.innerHTML = html;
    const head = this.doc.getElementsByTagName('head')[0];
    head.appendChild(s);
  }


  private googleAnalytics() {
    this.scriptHtml(`
      // Set to the same value as the web property used on the site
      var gaProperty = "` + TRACKINGID + `";
  
      // Disable tracking if the opt-out cookie exists.
      var disableStr = 'ga-disable-' + gaProperty;
  
      // if (document.cookie.indexOf(disableStr + '=true') > -1) {
      if (document.cookie.indexOf('gd-cookieconsent=') < 0) {
        //alert('revoke!');
        window[disableStr] = true;
      }
  
      // Opt-in function
      function gaOptIn() {
        var oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        document.cookie = 'gd-cookieconsent=allow; expires="' + oneYearFromNow.toGMTString() + '"';
        
        window[disableStr] = false;
        //document.getElementById("cookiebanner").remove();
        window.location.reload()
      }
  
      // Opt-out function
      function gaOptOut() {
        document.cookie = 'gd-cookieconsent=; expires = Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = '_ga=; expires = Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = '_gid=; expires = Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = '_gat_gtag_` + TRACKINGID.replace(/-/g, '_') + `=; expires = Thu, 01 Jan 1970 00:00:00 GMT';
        window[disableStr] = true;
        window.location.reload()
      }
    `, null);

    // <!-- Global site tag (gtag.js) - Google Analytics -->
    this.scriptHtml(null, 'https://www.googletagmanager.com/gtag/js');
    this.scriptHtml( `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    `, null)
    this.scriptHtml(null, 'https://cdn.auth0.com/js/lock/11.23.1/lock.min.js');

  }


}
