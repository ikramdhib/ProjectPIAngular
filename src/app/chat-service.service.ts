import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, identity } from 'rxjs';
import { AdminResponse, Message } from './pages/chat-component/messagemodel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8081/api/messages'; // URL de votre backend
  private apiUrl1 = 'http://localhost:8081'; // URL de votre backend



  

  constructor(private http: HttpClient) {}

  sendMessage(message: Message, userId: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/add?userId=${userId}`, message);
  }

  getPreviousMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/user/${userId}`);
  }

  replyToStudent(messageId: string, adminResponse: AdminResponse): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl1}/admin-responses/add/${messageId}`, adminResponse);
  }
  // chat-service.service.ts

getAdminResponsesForMessage(id: string): Observable<AdminResponse[]> {
  return this.http.get<AdminResponse[]>(`${this.apiUrl1}/api/admin-responses/messages/${id}/admin-responses`);
}

 
}
