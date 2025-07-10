import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private AuthService:LoginService,private router :Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    let authenticate = this.AuthService.isAuthenticate();
    if(authenticate){
      return true;
    }else{
      localStorage.clear();
      this.router.navigate(['login']);
      return false;
    }
  }

}
