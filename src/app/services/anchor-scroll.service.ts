import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnchorScrollService {

  constructor(private router: Router) { }

  listen() {
    this.router.events.subscribe(val => {
      // console.log(val);
      if (val instanceof NavigationEnd) {
        let fragmentIdx = val.urlAfterRedirects.lastIndexOf('#');
        if (fragmentIdx >= 0 && fragmentIdx < val.urlAfterRedirects.length - 1) {
          let fragment = val.urlAfterRedirects.substring(fragmentIdx+1);
          // console.log('fragment: ' + fragment);
          document.getElementById(fragment).scrollIntoView();
        }
      }
    })
  }
}