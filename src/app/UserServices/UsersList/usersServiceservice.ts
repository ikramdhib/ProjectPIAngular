import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from './UserModel.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {
  [x: string]: any;
  API_RL=environment.API_URL;

  supervisors  = new BehaviorSubject<any[]>([]);
  total = new BehaviorSubject<number>(0);

  constructor(private http:HttpClient , private router:Router) { }

  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}


  getAllStudents(){
  return  this.http.get(`${this.API_RL}api/v1/user/users/ETUDIANT`,this.httpOptions);
  }

  getAllSupervisor(){
    return  this.http.get(`${this.API_RL}api/v1/user/users/ENCADRANT`,this.httpOptions);
    }


    addStudent(user:any){
      return this.http.post<any>(`${this.API_RL}api/v1/user/addStudent`,user);
    }

    addSupervisor(user:any){
      return this.http.post<any>(`${this.API_RL}api/v1/user/addSupervisor`,user);
    }

     getUser(id : string) : Observable<User>{
      return this.http.get<User>(`${this.API_RL}api/v1/user/getUser/${id}`);
    }

    updateUser(id : string , resquest : any){
      return this.http.put(`${this.API_RL}api/v1/user/updateUser/${id}`,resquest);
    }


    sendEmailVerification(id :string , request:any){
      return this.http.post(`${this.API_RL}api/v1/user/requestOfChangingPass/${id}`,request,this.httpOptions);
    }

    changePassword(id: string , request:any){
      return this.http.put(`${this.API_RL}api/v1/user/changePassword/${id}`,request);
    }
    blockUser(id:string){
      return this.http.put(`${this.API_RL}api/v1/user/blockUser/${id}`,null);
    }
    unblockUser(id:string){
      return this.http.put(`${this.API_RL}api/v1/user/deblockUser/${id}`,null);
    }

    deleteUser(id:String){
      return this.http.delete(`${this.API_RL}api/v1/user/deleteUser/${id}`);
    }
    getAllServicesstage(){
      return this.http.get(`${this.API_RL}api/v1/user/users/SERVICE_STAGE`,this.httpOptions);
    }
    addIntershipServiceUser(request:any){
      return this.http.post(`${this.API_RL}api/v1/user/addServiceStage`,request,this.httpOptions);
    }
    updateIntershipService(id:String, request:any){
      return this.http.put(`${this.API_RL}api/v1/user/updateService/${id}`,request);
    }
}
