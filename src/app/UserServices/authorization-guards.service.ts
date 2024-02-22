import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from './authenticationUser.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuardsService implements CanActivate {

  constructor(public authServ : AuthenticationService) { }


  canActivate(route : ActivatedRouteSnapshot):boolean{

    const expceptedRoles = route.data['roles'];

    let tokenPayLoad : any = jwtDecode(this.authServ.token);

    let access="null";
    if(this.authServ.isAuthenticated()){
      tokenPayLoad.role.forEach((claim :any) => {
        if(expceptedRoles.includes(claim.authority)){
          access="true";
          console.log(claim.authority);
        }
      });
    }
    if(access==="true"){
      return true ;
    }
    return false ;
  }
}
