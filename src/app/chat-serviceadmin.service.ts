import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { Message } from './pages/chat-component/messagemodel';
import { AdminResponse } from './pages/adminchat/AdminResponse';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceadminService {
  private apiUrl = 'http://localhost:8081/api/admin-responses';
  private apiUrlMessages = 'http://localhost:8081/api/messages';

  constructor(private http: HttpClient) { }
// Méthode pour envoyer une réponse de l'administrateur à un message existant


sendAdminMessage(message: Message, adminResponseContent: string): Observable<Message> {
  // Récupérer les informations sur l'utilisateur actuellement connecté
  const userId = '65d5f4bfb6165c22e70320ec'; // Remplacez par la manière dont vous récupérez l'ID de l'utilisateur

  // Créer un objet AdminResponse avec les données récupérées
  const adminResponse: AdminResponse = {
    adminResponseId: '', // Laissez cette propriété vide, elle sera générée côté serveur
    id: message.id, // ID du message auquel cette réponse est associée
    content: adminResponseContent,
    timestamp: new Date(), // Utilisez la date actuelle ou la date appropriée
    user: {
      userId: userId // Utilisez l'ID de l'utilisateur actuellement connecté
    }
  };

  // Appel de la méthode sendAdminMessage avec l'objet AdminResponse complet
  return this.http.post<Message>(`${this.apiUrl}/add/${message.id}`, adminResponse);
}

getAllStudentMessages(): Observable<Message[]> {
  return this.http.get<Message[]>(`${this.apiUrlMessages}/me`);
}
}