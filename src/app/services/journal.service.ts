// journal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private apiUrl = 'your_api_url';

  constructor(private http: HttpClient) {}

  addJournalForStage(stageId: string): Observable<any> {
    // Supposons que vous avez une API qui gère l'ajout du journal pour le stage spécifié
    return this.http.post(`${this.apiUrl}/addJournalForStage`, { stageId });
  }
}
