import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminResponse, Message } from './messagemodel';
import { ChatService } from 'src/app/chat-service.service';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.scss']
})
  export class ChatComponentComponent implements OnInit {
    studentId = '65d5faf88ecbf72fd4d359f2'; // Identifiant de l'étudiant (statique pour les tests)
    adminId = '65d7b5d7025a231f20900abb'; // Identifiant de l'administrateur (statique pour les tests)
    studentMessages: Message[] = [];
    adminMessages: Message[] = [];
    newStudentMessage: string = '';
    newAdminResponse: string = ''; // Champ pour la réponse de l'administrateur
    selectedMessage: Message | null = null;
    currentUser: any; // Déclarez la variable currentUser

    constructor(private chatService: ChatService) {}
  
    ngOnInit(): void {
      this.loadMessages();
    }
    loadMessages(): void {
      // Chargez les messages de l'étudiant
      this.chatService.getPreviousMessages(this.studentId).subscribe(studentMessages => {
        this.studentMessages = studentMessages;
    
        // Pour chaque message de l'étudiant, chargez les réponses associées de l'administrateur
        this.studentMessages.forEach(message => {
          this.chatService.getAdminResponsesForMessage(message.id).subscribe(adminResponse => {
            // Vérifiez que la réponse de l'administrateur est définie et non vide
            if (adminResponse) {
              // Ajoutez la réponse de l'administrateur au message
              message.adminResponses = adminResponse;
            }
          });
        });
      });
    
    
    
    

      
    }
    getAdminResponsesForMessages(): void {
      this.studentMessages.forEach(message => {
        this.chatService.getAdminResponsesForMessage(message.id).subscribe(adminResponses => {
          // Vérifiez que les réponses de l'administrateur sont définies et non vides
          if (adminResponses && Array.isArray(adminResponses)) {
            // Ajoutez les réponses de l'administrateur au message
            message.adminResponses = adminResponses;
          }
        });
      });
    }
    
  
    sendStudentMessage(): void {
      const message: Message = { 
        content: this.newStudentMessage, 
        userId: this.studentId,
        lastName: '', // Laissez-le vide ou définissez une valeur par défaut
        firstName: '' // Laissez-le vide ou définissez une valeur par défaut
      };
      this.chatService.sendMessage(message, this.studentId).subscribe(response => {
        this.studentMessages.push(response);
        this.newStudentMessage = '';
      });
    }
    
  
    sendAdminResponse(): void {
      if (this.selectedMessage && this.newAdminResponse.trim()) {
        const adminResponse: AdminResponse = { content: this.newAdminResponse };
        this.chatService.replyToStudent(this.selectedMessage.id!, adminResponse).subscribe(response => {
          this.adminMessages.push(response);
          this.newAdminResponse = '';
          this.selectedMessage = null;
        });
      }
    }
  
    selectMessage(message: Message): void {
      this.selectedMessage = message;
    }
  }