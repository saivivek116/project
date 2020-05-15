/*import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service'; 


@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private auth: AuthService, private _route: ActivatedRoute, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.auth.isUserAuthenticated()==true)
      return true;
    else{
      this.router.navigate(["/login"]);
      return false;
    }

  }
}*/