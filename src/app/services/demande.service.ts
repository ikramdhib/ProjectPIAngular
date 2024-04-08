import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private readonly apiUrl = 'http://localhost:8081';
  private readonly apiUrl2= 'http://localhost:8081/api/stages';


  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/user/afficherUtilisateur/${userId}`);
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


}