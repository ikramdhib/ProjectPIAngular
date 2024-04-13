import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchedulerEvent } from '../models/event'; // Importez votre modèle SchedulerEvent

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8081/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<SchedulerEvent[]> { // Utilisez SchedulerEvent au lieu de Event
    return this.http.get<SchedulerEvent[]>(`${this.apiUrl}/GetAllEvent`);
  }

  createEvent(event: SchedulerEvent): Observable<SchedulerEvent> {
    return this.http.post<SchedulerEvent>(`${this.apiUrl}/addEvent`, event);
  }
}
