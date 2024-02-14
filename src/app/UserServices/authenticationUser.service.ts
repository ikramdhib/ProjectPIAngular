import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Authenticationrequest } from './AuthenticationRequest';
import { JwtHelperService  , JWT_OPTIONS} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_RL=environment.API_URL;
  isUserLogIn=false;


  constructor(private http:HttpClient , private router:Router , public jwtHelper : JwtHelperService ) { }

  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}

  userLogin(request : Authenticationrequest){
    return this.http.post(`${this.API_RL}api/v1/auth/authenticate`,request,this.httpOptions)
    .toPromise().then(
      (response:any)=>{
        console.log("token",response?.acesstoken);
        if(response?.acesstoken !=null && response?.refreshToken!=null ){
          
          localStorage.setItem('token',response?.acesstoken);
          localStorage.setItem('reresh-Token',response?.refreshToken);
        }
      },
    )
  }

  get token(){
    let token : any = localStorage.getItem('token');
    return token;
  }

  get userName(){
    let tokenDecode = this.jwtHelper.decodeToken(this.token);
    return tokenDecode.sub;
  }

  public isAuthenticated():boolean{

    if(this.token != null && this.jwtHelper.isTokenExpired(this.token)){
      let token:any = localStorage.getItem("reresh-Token");
      localStorage.setItem('token',token);
    }
    this.isUserLogIn = !this.jwtHelper.isTokenExpired(this.token);

    console.log("user logged :",this.isUserLogIn);
    return this.isUserLogIn;
  }

  public logout(){
    this.http.get(`${this.API_RL}api/v1/auth/logout`,this.httpOptions);
    this.router.navigate(['/authentication']);
    localStorage.removeItem("token");
    localStorage.removeItem("reresh-Token");
   
  }

}
