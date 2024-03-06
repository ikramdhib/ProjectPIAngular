// journal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  static addTacheWithJournal(formData2: any, id: any) {
    throw new Error("Method not implemented.");
  }
  private apiUrl = "http://localhost:8081/api/journals";
  private baseUrl= "http://localhost:8081/api/taches";

  constructor(private http: HttpClient) {}

  addJournal(stageId: string): Observable<any> {
    // Utilisez HttpClient pour envoyer la requête POST vers votre endpoint Spring Boot
    return this.http.post(`${this.apiUrl}/add/${stageId}`, {});
  }

  addTacheWithJournal(tacheData: any, journalId: string): Observable<any> {
    const url = `${this.baseUrl}/addWithJournal/${journalId}`;
    return this.http.post(url, tacheData);
  }

  getTachesByJournal(journalId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tachesByJournal/${journalId}`);
  }

  updateTache(tacheId: string, updatedTache: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${tacheId}`, updatedTache);
  }

  deleteTache(tacheId: string): Observable<any> {
    const url = `${this.baseUrl}/${tacheId}`;
    return this.http.delete(url);
  }


}
