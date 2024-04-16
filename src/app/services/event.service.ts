import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchedulerEvent } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8081/api/events';

  constructor(private http: HttpClient) {}

  getEvents(userId: string): Observable<SchedulerEvent[]> {
    return this.http.get<SchedulerEvent[]>(`${this.apiUrl}/GetEvent/${userId}`);
  }
  

  createEvent(event: SchedulerEvent, userId: string): Observable<SchedulerEvent> {
    return this.http.post<SchedulerEvent>(`${this.apiUrl}/addEvent/${userId}`, event);
  }
}