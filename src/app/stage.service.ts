import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private baseUrl = 'http://localhost:8081'; // Remplacez ceci par l'URL de votre backend

  constructor(private http: HttpClient,private toastr: ToastrService) { }


  getAllStagesWithUserNames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/userNames`);
  }
  sendEmailToEncadrant(stageId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendEmailToEncadrant/65d64c88516e982a56754071`, {});
  }
  sendEmailToStudent(stageId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendEmailToStudent/${stageId}`, {});

}}