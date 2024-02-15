import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private baseUrl = 'http://localhost:8081'; // Remplacez ceci par l'URL de votre backend

  constructor(private http: HttpClient) { }

  getAllStagesWithUserNames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/userNames`);
  }}