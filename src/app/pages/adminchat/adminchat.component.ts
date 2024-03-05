import { Component, OnInit } from '@angular/core';
import { ChatServiceadminService } from 'src/app/chat-serviceadmin.service';
import { Message } from '../chat-component/messagemodel';
import { AdminResponse } from './AdminResponse';

@Component({
  selector: 'app-adminchat',
  templateUrl: './adminchat.component.html',
  styleUrls: ['./adminchat.component.scss']
})
export class AdminchatComponent implements OnInit {
  

 
  
  studentMessages: Message[] = [];
  adminResponseContent: string = '';
  selectedMessage: Message | null = null;

  constructor(private chatService: ChatServiceadminService) { }

  ngOnInit(): void {
    this.loadAllStudentMessages();
  }

  loadAllStudentMessages(): void {
    this.chatService.getAllStudentMessages().subscribe(messages => {
      this.studentMessages = messages;
    });
  }

 
  replyToStudent(message: Message): void {
    this.selectedMessage = message;
  }

  sendAdminResponse(): void {
    if (this.selectedMessage && this.adminResponseContent.trim() !== '') {
      this.chatService.sendAdminMessage(this.selectedMessage, this.adminResponseContent)
        .subscribe(response => {
          this.selectedMessage = null;
          this.adminResponseContent = '';
          this.loadAllStudentMessages();
        });
    }
  }
  selectMessage(message: Message): void {
  this.selectedMessage = message;
}


  }
