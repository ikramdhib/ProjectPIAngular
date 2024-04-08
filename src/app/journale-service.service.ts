import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournaleServiceService {


  constructor(private http: HttpClient) { }

  getJournalTasks(studentId: string): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:8081/student/${studentId}/tasks`);
  }
  getTachesByJournal(journalId: string): Observable<any> {
    return this.http.get(`http://localhost:8081/tachesByJournal/${journalId}`);
   
  }

  getTachesByEtudiantId(etudiantId: string): Observable<any> {
    return this.http.get(`http://localhost:8081/tachesByEtudiant/${etudiantId}`);
   
  }
}
