import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JournaleServiceService } from 'src/app/journale-service.service';
import { StageService } from 'src/app/stage.service';
import { TaskDialogComponentComponent } from 'src/app/pages/task-dialog-component/task-dialog-component.component';
import { UserServiceService } from 'src/app/user-service.service';
import { catchError, finalize, throwError } from 'rxjs';
import { ReasonDialogComponent } from '../reason-dialog/reason-dialog.component';

@Component({
  selector: 'app-list-etudiant-service-stage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-etudiant-service-stage.component.html',
  styleUrl: './list-etudiant-service-stage.component.scss'
})
export class ListEtudiantServiceStageComponent {
  selectedStudentTasks: any[] = []; // Initialisez la variable selectedStudentTasks

  students: any[] = [];
  serviceId: string = '65f8536e64a75e5c7ef2c291'; // Remplacez par l'ID réel du service de stage

  constructor(private studentService: UserServiceService,private http: HttpClient, private toastr: ToastrService ,public dialog: MatDialog,private userList: UserServiceService, private router: Router, private journalService: JournaleServiceService,private Stage:StageService) { }

  ngOnInit(): void {
    this.getStudentsByAllStages();
    this.breadCrumbItems = [{ label: 'Icons' }, { label: 'Dripicons', active: true }];
    this.getStagesForUser();

  }
  rejectStudent(studentId: string): void {
    const dialogRef = this.dialog.open(ReasonDialogComponent, {
      width: '400px',
      data: { reason: '' } // Initialisez la donnée avec une chaîne vide
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Vérifiez si la raison a été fournie
        // Mettre à jour l'attribut validated de l'étudiant à false
        this.studentService.rejectStudent(studentId, result).pipe(
          catchError(error => {
            console.error('Une erreur est survenue lors du rejet de l\'étudiant : ', error);
            this.toastr.error('Une erreur est survenue lors du rejet de l\'étudiant', 'Erreur');
            throw error;
          }),
          finalize(() => {
            // Rafraîchir la liste des étudiants après le rejet
            this.getStudentsByAllStages();
          })
        ).subscribe(() => {
          // Si le rejet réussit, mettez à jour le statut de l'étudiant dans la liste
          const student = this.students.find(student => student.id === studentId);
          if (student) {
            student.validated = false; // Mettez à false puisque c'est un rejet
            this.toastr.success('Étudiant rejeté avec succès', 'Succès');
          }
        });
      }
    });
  }
  
  
  getStagesForUser() {
    this.Stage.getStagesByUserIdd(this.serviceId).subscribe(
      (data: any) => {
        this.stages = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des stages : ', error);
      }
    );
  }

  breadCrumbItems: Array<{}>;
  taches: any[] = [];
  selectedJournalTasks: any[] = []; // Modifier le type de selectedJournalTasks pour accepter des objets de type Journal
  timeline: any[] = []; // Ajoutez cette ligne
  stages: any[] = [];
  isClicked: boolean = false;
  selectedStudentId: string = ''; // Variable pour stocker l'ID de l'étudiant sélectionné
  tasks: any[] = []; 
  
  


  downloadReport(studentId: any) {
    // Logic for downloading report
    // Set isClicked to true to trigger animation
    this.isClicked = true;

    // Reset isClicked to false after a delay to stop the animation
    setTimeout(() => {
      this.isClicked = false;
    }, 500); // Adjust the delay to match the animation duration
  }

  showTaches(journalId: string) {
    if (this.showTachesMap[journalId]) {
      // Si la liste des tâches est déjà affichée, on la masque
      this.taches = [];
      this.showTachesMap[journalId] = false;
    } else {
      // Sinon, on récupère les tâches et on les affiche
      this.journalService.getTachesByJournal(journalId).subscribe(
        (response: any[]) => {
          this.taches = response;
          this.showTachesMap[journalId] = true;
        },
        (error) => {
          console.error('Erreur lors de la récupération des tâches:', error);
        }
      );
    }
  }


  getStudentsByAllStages(): void {
    this.studentService.getStudentsByAllStages(this.serviceId)
      .subscribe(
        (data: any[]) => {
          console.log('Données récupérées:', data); // Afficher les données récupérées dans la console
          this.students = data;
        },
        (error) => {
          console.error('Une erreur est survenue lors de la récupération des étudiants : ', error);
        }
      );
  }
  

  showTachesMap: { [key: string]: boolean } = {};
  showJournalTasks(student: any): void {
    this.journalService.getJournalTasks(student.id).subscribe(tasks => {
      this.selectedJournalTasks = tasks;
    });
  }
  viewStudentDetails(studentId: string, stageId: string) {
    this.Stage.getStudentTimeline(studentId, stageId).subscribe(timeline => {
      // Mettez à jour la variable timeline avec les données récupérées
      this.timeline = timeline;
      console.log(this.timeline); // Pour vérifier les données dans la console du navigateur
    });
  }



openDialog(tasks: any[]): void {
    const dialogRef = this.dialog.open(TaskDialogComponentComponent, {
      data: { tasks: tasks }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
}

 
  getJournalsWithTasks(studentId: string): void {
    this.journalService.getJournalTasks(studentId)
      .subscribe(journals => {
        // Vous pouvez également manipuler les données ici si nécessaire
        this.selectedJournalTasks = journals; // Assurez-vous que selectedJournalTasks est défini pour accepter des objets de type Journal
        console.log(this.selectedJournalTasks);
      });
  }
  getTachesByEtudiantId(etudiantId: string): void {
    this.journalService.getTachesByEtudiantId(etudiantId).subscribe(
      taches => this.taches = taches,
      error => console.log(error)
    );
  }

  showTasks(student: any) {
    if (student && student.id) { // Vérifiez si student est défini et s'il a une propriété id
      const studentId = student.id; // Récupérer l'ID de l'étudiant
      this.journalService.getTachesByEtudiantId(studentId).subscribe(
        (tasks: any[]) => {
          this.selectedStudentTasks = tasks;
        },
        error => {
          console.log('Erreur lors de la récupération des tâches de l\'étudiant : ', error);
        }
      );
    } else {
      console.error('ID de l\'étudiant non défini.');
    }
    
  }
  
  downloadRapportDeStage(etudiantId: string): void {
    this.Stage.getRapportDeStagePdfAvecOCR(etudiantId)
      .subscribe(response => {
        if (response.status === 200) {
          const contentDisposition = response.headers.get('content-disposition');
          if (contentDisposition && contentDisposition.includes('attachment')) {
            const blob = new Blob([response.body], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'rapport_de_stage.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          } else {
            // Convertir le blob en texte
            response.body.text().then(text => {
              console.error('Erreur lors de la récupération du rapport de stage:', text);
              if (text.includes('Le texte extrait ne respecte pas les normes')) {
                this.toastr.error('Le texte extrait ne respecte pas les normes.', 'Attention');
              } 
            });
          }
        }
      }, error => {
        console.error('Le texte extrait ne respecte pas les normes.', error);
        this.toastr.error('Le texte extrait ne respecte pas les normes.', 'Erreur');
      });
  }
  
  validerEtudiant(student: any) {
    // Logique pour valider l'étudiant
    this.userList.validateStudent(student.id).pipe(
      catchError(error => {
        console.error('Erreur lors de la validation de l\'étudiant : ', error);
        this.toastr.success('Étudiant validé avec succès', 'Succès');
        throw error;
      }),
      finalize(() => {
        // Rafraîchir la liste des étudiants après la validation
        this.getStudentsByAllStages();
      })
    ).subscribe(() => {
      // Si la validation réussit, mettez à jour le statut de l'étudiant dans la liste
      student.validated = true;
      this.toastr.success('Étudiant validé avec succès', 'Succès');
    });
  }
  
  
  downloadAttestationDeStage(userId: string): void {
    this.Stage.downloadAttestationDeStage(userId).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Attestation_de_stage.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Erreur lors du téléchargement du attestation de stage :', error);
      }
    );
  }
  
  

}
