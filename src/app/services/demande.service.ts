import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private readonly apiUrl = 'assets/demande_stage.html';

  constructor(private http: HttpClient) {}

  getDemandeDeStageContent(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}