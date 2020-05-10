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
    /*.pipe(
        tap(loggedIn => { 
          console.log(loggedIn);
        //if (!loggedIn) {
        //    this.auth.login(state.url);
        //  }
        })
      ); */
    }
}