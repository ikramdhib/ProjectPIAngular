import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {
  API_RL=environment.API_URL;

  constructor(private http:HttpClient , private router:Router) { }

  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}


  getAllStudents(){
  return  this.http.get(`${this.API_RL}api/v1/user/users/ETUDIANT`,this.httpOptions);
  }

  getAllSupervisor(){
    return  this.http.get(`${this.API_RL}api/v1/user/users/ENCADRANT`,this.httpOptions);
    }

}
