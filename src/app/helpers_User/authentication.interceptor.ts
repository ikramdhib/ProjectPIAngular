import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../UserServices/AuthenticationServices/authenticationUser.service';
import { JwtHelperService } from '@auth0/angular-jwt';


const TOKEN_HEADER_KEY = 'Authorization';  


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(public authService : AuthenticationService , public jwtHelper : JwtHelperService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {


    let authReq = request ; 
    let token = localStorage.getItem("token");
    let tokenRefreshed = false;


 if(token!=null && !this.jwtHelper.isTokenExpired(token) ){

    const expirationDate = this.authService.getExpiration(token);

    const now = new Date();

if(expirationDate!=null){
  const time = expirationDate.getTime() - now.getTime() - 60000;

      authReq = request.clone({
        headers:request.headers.set(TOKEN_HEADER_KEY,'Bearer '+token)
      });

      console.log(time,"time ouuut");
      
      if(time < 120000 && !tokenRefreshed){

        console.log("from if tooo")

        tokenRefreshed = true;
        
        this.authService.refreshToken().subscribe({
          next:(res:any)=>{
            token=res.acesstoken;
          },
          complete:()=>{
            authReq = request.clone({
              headers:request.headers.set(TOKEN_HEADER_KEY,'Bearer '+token)
            });
            localStorage.setItem("token",token);
          }
        })
      }

    }
  }
    return next.handle(authReq);

    
   /* if(token != null){
      const expirationDate = this.authService.getExpiration(token);
      const now = new Date();
      authReq= request.clone({
        headers:request.headers.set(TOKEN_HEADER_KEY,'Bearer '+token)
      });

    }
    console.log(request.headers.get(TOKEN_HEADER_KEY))
    return next.handle(request);
  }*/
  }









/*
    if(this.token!=null && this.expirationDate!=null){
      request = request.clone({
        headers:request.headers.set(TOKEN_HEADER_KEY,'Bearer '+this.token)
      });

      if(this.expirationDate.getTime() - this.now.getTime() - 60000){

        this.authService.refreshToken().subscribe({
          next:(res:any)=>{
            console.log(res,"************************")
            this.token=res;

            request = request.clone({
              headers:request.headers.set(TOKEN_HEADER_KEY,'Bearer '+this.token)
            });
          },
          complete:()=>{
            console.log("DONEEEEEEEEEEEEEEEE")
          }
        })
  
        request = request.clone({
  
        })
      }

    }
   
    return next.handle(request);*/
   // this.token = localStorage.getItem("token");

    //expirationDate = this.authService.getExpiration(this.token);
  
    // now = new Date();
/*
  console.log("tito")
    return next.handle(this.addToken(request)).pipe(
      catchError(error => {
        if (this.token!=null) {
          console.log("tito from 403")
          return this.refreshToken(request, next);
        } else {
          return throwError(error);
        }
      })
    );*/
  
/*
  public addToken(request: HttpRequest<any>): HttpRequest<any>{
    
    if(this.token != null){
      console.log(this.jwtHelper.isTokenExpired(this.token),"##############################")

      console.log(this.authService.getExpiration(this.token),"date d'expiration");
      console.log("token addToken " , this.token)
      return request.clone({
        headers:request.headers.set(TOKEN_HEADER_KEY,'Bearer '+this.token)
      });
    }

    return request;
  }*/

  /*public refreshToken(request: HttpRequest<any>, next: HttpHandler) :Observable<HttpEvent<any>>{

    console.log("here we go again ");
 
   const now = new Date();
   const timeUntilRefresh = this.expirationDate.getTime() - now.getTime() - 60000;
    setTimeout(() => { this.authService.refreshToken().pipe(
      switchMap(() => {
        console.log(request , "@@@@@@@@@@@@@@@@@@")
        return next.handle(this.addToken(request));
      }),
      catchError(error => {
        this.authService.logout(); 
        return throwError(error);
      })
    )
    } , timeUntilRefresh);
  }*/

  
}
