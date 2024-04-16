import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  API_RL=environment.API_URL;
  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}

  constructor(private http:HttpClient , private router:Router) { }


  AddReclamation(data:any){
    return this.http.post(`${this.API_RL}/addReclamation`,data,this.httpOptions);
  }
}
