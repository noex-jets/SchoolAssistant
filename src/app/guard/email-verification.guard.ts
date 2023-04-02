import { DataService } from './../services/data.service';
import { emailVerified } from '@angular/fire/auth-guard';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, getAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth,
    private dataService: DataService,
  ) {

  }

  getUser() {
    const auth = getAuth()
    const user = auth.currentUser
    return user
  }

   canActivate(route: ActivatedRouteSnapshot){
    console.log(this.getUser())

    if (this.getUser().emailVerified === true) {
      return true;
    } else {
      return this.router.parseUrl("/email-verification")
    }
  }

  // canActivate(route: ActivatedRouteSnapshot) {
  //   console.log(this.authService.getCurrentUser().emailVerified)
  //   if(this.authService.getCurrentUser(). emailVerified == true){
  //     console.log(true)
  //     return true
  //   }
  //   else {
  //     console.log(false)
  //     return false
  //   }
  // }
}
