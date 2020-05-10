import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class APIResolver implements Resolve<any> {
  constructor(private auth: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log('resolve');
    return this.auth.isAuthenticated$ 
    }


  getUser(loggedIn) {
    var currentUser = 
        {
            userId: loggedIn.sub.split("|")[1],
            userName: loggedIn['http://example.com/username']
        }
    return currentUser;
  }




}