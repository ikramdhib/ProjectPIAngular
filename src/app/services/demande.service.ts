import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private readonly apiUrl = 'http://localhost:8081/api/user';
  private readonly apiUrl2= 'http://localhost:8081/api/stages';


  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/afficherUtilisateur/${userId}`);
  }

  getDemandeStageContent(): Observable<string> {
    return this.http.get('assets/demande_stage.html', { responseType: 'text' });
  }

  telechargerPDF(htmlContent: string): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'text/html'
    });

    return this.http.post('http://localhost:8081/api/download/generate-pdf', htmlContent, {
        headers,
        responseType: 'arraybuffer'
    });
  }

  saveDemandeStage(userId: string, demandeStageContent: string): Observable<any> {
    const url = `${this.apiUrl2}/save-demande-stage/${userId}`;
    return this.http.post(url, demandeStageContent);
}



}