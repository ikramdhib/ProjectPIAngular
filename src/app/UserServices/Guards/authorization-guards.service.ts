import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../AuthenticationServices/authenticationUser.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuardsService implements CanActivate {

  constructor(public authServ : AuthenticationService ,
    public router : Router) { }


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
    }else{
      this.router.navigate(['/pages/404'])
      return false ;
    }
  }
}
