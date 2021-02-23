import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { RegisterModalComponent } from './register-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  protected loggedIn: boolean;

  constructor(private router:Router, private authService: AuthService, public matDialog: MatDialog ) {
  }
  
  


canActivate(): Promise<boolean> {
   return this.authService.isAuthenticated$.toPromise().then(auth => {
        if (auth) { 
          return true;
        }
        else {
          this.registerModal();
          this.router.navigate(['/about']);  
          return false        
        }       
   });

}
    
    registerModal() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = false;
      console.log('modal')
      this.matDialog.open(RegisterModalComponent, dialogConfig);
    }

}
