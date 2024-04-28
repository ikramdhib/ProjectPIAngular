import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SchedulerEvent } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8081/api/events';
  private eventAddedSubject: Subject<SchedulerEvent> = new Subject<SchedulerEvent>();

  constructor(private http: HttpClient) {}

  createEvent(event: SchedulerEvent, userId: string): Observable<SchedulerEvent> {
    return this.http.post<SchedulerEvent>(`${this.apiUrl}/AddEvent/${userId}`, event);
  }

  getEvents(userId: string | null = null): Observable<SchedulerEvent[]> {
    const url = userId ? `${this.apiUrl}/GetEvents/${userId}` :` ${this.apiUrl}/GetAllEvents`;
    return this.http.get<SchedulerEvent[]>(url);
  }

  // Méthode pour émettre un événement ajouté
  emitEventAdded(event: SchedulerEvent) {
    this.eventAddedSubject.next(event);
  }

  // Observable pour écouter les événements ajoutés
  onEventAdded(): Observable<SchedulerEvent> {
    return this.eventAddedSubject.asObservable();
  }
}