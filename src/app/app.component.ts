import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {
  protected start: Boolean;
  

  constructor(router:Router) {
    router.events.forEach((event) => {
      if (router.url.includes('/start')) {  
        this.start = true; 
      } else {
        this.start = false; 
      }
    });
  }

}
