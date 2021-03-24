import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
//import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { RegisterModalComponent } from './register-modal.component';
//import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  protected loggedIn: boolean;
  private route: ActivatedRoute;

  constructor(private router:Router, private authService: AuthService, public matDialog: MatDialog) { //}, private cookieService: CookieService ) {
  }
  
  


canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
   //console.log(state)
   const cookie = this.getCookie(); 
   return this.authService.isAuthenticated$.toPromise().then(auth => {
        //if (auth && !cookie) {
        //  location.reload();
        //}
        if (!auth && cookie) {
          location.reload();
        }

        if (auth && cookie) { 
          return true;
        }
        if (!cookie) {
          this.registerModal();
          this.router.navigate(['/about']);  
          return false        
        }       
   });

}
    
    registerModal() {
      const dialogConfig = new MatDialogConfig();
      //dialogConfig.disableClose = true;
      dialogConfig.autoFocus = false;
      //console.log('modal')
      this.matDialog.open(RegisterModalComponent, dialogConfig);
    }


    getCookie() {
      if (document.cookie.indexOf('gd_logged_in=c30hed92dusy7b8d') > -1 ) {
        return true;
      }
      return false;

    };

}
