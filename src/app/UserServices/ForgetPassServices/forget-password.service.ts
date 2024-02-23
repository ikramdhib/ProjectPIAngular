import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  API_RL=environment.API_URL;
  constructor(private http:HttpClient , private router:Router , public jwtHelper : JwtHelperService) { }

  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}

    userResetPassword(request:any){
      return this.http.post(`${this.API_RL}api/v1/auth/password-reset-request`,request)
    }

    
    
    changePasswordOfUser(request:any , token:any) : Observable<any>{
      console.log(`${this.API_RL}api/v1/auth/reset-password?token=${token}`)
      return this.http.post(`${this.API_RL}api/v1/auth/reset-password?token=${token}`,request,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
    }

    

}
