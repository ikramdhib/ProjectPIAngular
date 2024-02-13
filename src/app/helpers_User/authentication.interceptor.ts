import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';


const TOKEN_HEADER_KEY = 'Authorization';  

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    let authReq = request ; 
    const token = localStorage.getItem("token");

    if(token != null){

      authReq= request.clone({
        headers:request.headers.set(TOKEN_HEADER_KEY,'Bearer '+token)
      });

    }
    return next.handle(request);
  }
}

export const authInterceptorProvoders =[
  {
    provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true
  }
];
