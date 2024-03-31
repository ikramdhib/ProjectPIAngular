import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchedulerEvent } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8081/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/GetEvent`);
  }

  createEvent(event: SchedulerEvent): Observable<SchedulerEvent> {
    return this.http.post<SchedulerEvent>(`${this.apiUrl}/CreateEvent`, event);
  }

  updateEvent(event: SchedulerEvent): Observable<SchedulerEvent> {
    return this.http.put<SchedulerEvent>(`${this.apiUrl}/UpdateEvent/${event.id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteEvent/${id}`);
  }
}
