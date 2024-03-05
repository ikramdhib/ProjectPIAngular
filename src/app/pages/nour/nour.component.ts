import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JournaleServiceService } from 'src/app/journale-service.service';
import { StageService } from 'src/app/stage.service';
import { UserServiceService } from 'src/app/user-service.service';
import * as $ from 'jquery'; // Importer jQuery
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReasonModalComponent } from '../reason-modal/reason-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RejectionReasonDialogComponent } from 'src/app/pages/rejection-reason-dialog/rejection-reason-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nour',
  templateUrl: './nour.component.html',
  styleUrls: ['./nour.component.scss']
})
export class NourComponent {
  taches: any[] = [];
  students: any[] = [];
  selectedJournalTasks: any[] = []; // Modifier le type de selectedJournalTasks pour accepter des objets de type Journal
  timeline: any[] = []; // Ajoutez cette ligne
  stages: any[] = [];
  encadrantId: string = '65e2fcf80ca91442454d81e3'; // Remplacez par l'ID de l'utilisateur
  constructor(private http: HttpClient,    private toastr: ToastrService ,public dialog: MatDialog,private userList: UserServiceService, private router: Router, private journalService: JournaleServiceService,private Stage:StageService) { }
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
  getStagesForUser() {
    this.Stage.getStagesByEncadrantId(this.encadrantId).subscribe(
      (data: any) => {
        this.stages = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des stages : ', error);
      }
    );
  }
  validerTache(tacheId: string) {
    this.Stage.validateTask(tacheId).subscribe(
      () => {
        // Rafraîchir la liste des tâches après validation
        this.showTaches(this.stages[0].journal.id); // Vous pouvez ajuster cela pour obtenir le journal correct si nécessaire
        console.log('Tâche validée avec succès');
      },
      (error) => {
        console.error('Erreur lors de la validation de la tâche : ', error);
      }
    );
  
  }
  rejectionReason: string = '';
  tacheId: string = '';

  // Fonction pour rejeter la tâche avec raison
  rejeterTache(tacheId: string): void {
    const dialogRef = this.dialog.open(RejectionReasonDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // result contient la raison du rejet si l'utilisateur a cliqué sur "Valider"
        this.Stage.rejectTask(tacheId, result).subscribe(response => {
          console.log(response);
        }, error => {
          console.error(error);
          // Gérer les erreurs éventuelles
        });
      }
    });
  }
  afficherAttestation(): void {
    // Récupérer le contenu HTML du composant d'attestation
    this.http.get('/attestation', { responseType: 'text' })
      .subscribe((data: string) => {
        // Mettre à jour le contenu de l'emplacement défini dans le HTML
        document.getElementById('attestationContent').innerHTML = data;
      });
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
  ngOnInit(): void {
    const encadrantId = '65e2fcf80ca91442454d81e3';
    this.userList.getStudentsBySupervisor(encadrantId).subscribe(
      students => {
        this.students = students;
      },
     error => {
        console.error('Error fetching students:', error);
      }
    );
    this.getStagesForUser();

      // Supprimez ou commentez cette ligne si elle n'est pas utilisée
  }

 
  getJournalsWithTasks(studentId: string): void {
    this.journalService.getJournalTasks(studentId)
      .subscribe(journals => {
        // Vous pouvez également manipuler les données ici si nécessaire
        this.selectedJournalTasks = journals; // Assurez-vous que selectedJournalTasks est défini pour accepter des objets de type Journal
        console.log(this.selectedJournalTasks);
      });
  }


  ////////////////attestion

  openRejectionReasonInput(tacheId: string) {
    // Ouvre la zone de texte pour la raison du rejet pour la tâche spécifiée
    this.tacheId = tacheId;
  }

  rejectTask() {
    // Vérifie si une tâche est sélectionnée et si une raison est saisie
    if (this.tacheId && this.rejectionReason.trim() !== '') {
      // Envoie la raison du rejet au backend pour traitement
      this.Stage.rejectTask(this.tacheId, this.rejectionReason)
        .subscribe(
          () => {
            console.log('Tâche rejetée avec succès');
            // Réinitialise la raison du rejet et l'ID de la tâche une fois le rejet réussi
            this.rejectionReason = '';
            this.tacheId = null;
            // Ajoutez ici toute logique supplémentaire à effectuer après le rejet de la tâche
          },
          (error) => {
            console.error('Erreur lors du rejet de la tâche:', error);
            // Gérer les erreurs de rejet de la tâche
          }
        );
    } else {
      console.error('La raison du rejet est vide ou aucune tâche sélectionnée');
      // Gérer le cas où aucune raison n'est saisie ou aucune tâche n'est sélectionnée
    }
  }

redirectToAttestationStage(student: any): void {
  console.log("Student:", student);
    // Vérifiez si l'étudiant et son ID sont définis
  if (student && student.id && student.stageId) {
    console.log("Student:", student)

    // Naviguer vers la page AttestationComponent avec les données de l'étudiant
    this.router.navigate(['/attestation-stage', student.id, student.stageId]);
  } else {
    console.error('Unable to redirect to attestation stage: Invalid student data');
  }

}
}
