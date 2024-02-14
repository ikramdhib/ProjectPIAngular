import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from './authenticationUser.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardsService implements CanActivate {

  constructor(public authenServ : AuthenticationService , private router :Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    if(localStorage.getItem('token') == null || localStorage.getItem('token')==""){
      console.log(localStorage.getItem("token"))
      this.router.navigate(['/authentication'])
      return false
    }
    return true
  }


}
