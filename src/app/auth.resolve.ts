import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { logger } from './globals';

@Injectable()
export class APIResolver implements Resolve<any> {
  constructor(private auth: AuthService) {}

  resolve(): Observable<boolean> {
    logger('resolve');
    return this.auth.isAuthenticated$;
    }


  getUser(loggedIn) {
    return {
      userId: loggedIn.sub.split("|")[1],
      userName: loggedIn['http://example.com/username']
    }
  }

}