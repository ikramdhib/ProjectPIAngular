import { Component } from '@angular/core';
import { userListService } from '../contacts/userlist/userlist.service';
import { CommonModule } from '@angular/common';

import { AttestationComponent } from '../attestation/attestation.component';
import { UserServiceService } from 'src/app/user-service.service';
import { Router } from '@angular/router';
import { JournaleServiceService } from 'src/app/journale-service.service';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  students: any[] = [];
  selectedJournalTasks: string[];


  constructor(private userList:UserServiceService ,private router: Router,private journalService: JournaleServiceService) { }
  showJournalTasks(student: any): void { // Utilisez `any` ou `Student` comme type pour le paramètre
    this.journalService.getJournalTasks(student.id).subscribe(tasks => {
      this.selectedJournalTasks = tasks;
    });
  }
  ngOnInit(): void {
    const encadrantId = '65e1bb2ace284f6f4643e11a';
    this.userList.getStudentsBySupervisor(encadrantId).subscribe(
      students => {
        this.students = students;
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }
 
  redirectToAttestationStage(student: any): void {
    // Vérifiez si l'étudiant et son ID sont définis
    if (student && student.id && student.stageId) {
      // Naviguer vers la page AttestationComponent avec les données de l'étudiant
      this.router.navigate(['/attestation-stage', student.id, student.stageId]);
    } else {
      console.error('Unable to redirect to attestation stage: Invalid student data');
    }

}}
