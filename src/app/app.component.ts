import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {
  protected start: Boolean;
  
  constructor(router:Router) {
    router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
            this.start = event.url !== "/";
        }
      });
    }



}
