import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JournaleServiceService } from 'src/app/journale-service.service';
import { StageService } from 'src/app/stage.service';
import { UserServiceService } from 'src/app/user-service.service';

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
  constructor(private userList: UserServiceService, private router: Router, private journalService: JournaleServiceService,private Stage:StageService) { }
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
      },
      (error) => {
        console.error('Erreur lors de la validation de la tâche : ', error);
      }
    );
  }

  rejeterTache(tacheId: string, rejectionReason: string) {
    this.Stage.rejectTask(tacheId, rejectionReason).subscribe(
      () => {
        console.log("Tâche rejetée avec succès");
        // Ajoutez ici une logique pour actualiser l'affichage ou fournir un retour à l'utilisateur
      },
      (error) => {
        console.error("Erreur lors du rejet de la tâche :", error);
        // Ajoutez ici une logique pour gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
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
  ngOnInit(): void {
    const encadrantId = '65e1e65324678d25f015298f';
    this.userList.getStudentsBySupervisor(encadrantId).subscribe(
      students => {
        this.students = students;
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
    this.getStagesForUser();

    // this.getStudents(); // Supprimez ou commentez cette ligne si elle n'est pas utilisée
  }

  redirectToAttestationStage(student: any): void {
    if (student && student.id && student.stageId) {
      this.router.navigate(['/attestation-stage', student.id, student.stageId]);
    } else {
      console.error('Unable to redirect to attestation stage: Invalid student data');
    }
  }

  getJournalsWithTasks(studentId: string): void {
    this.journalService.getJournalTasks(studentId)
      .subscribe(journals => {
        // Vous pouvez également manipuler les données ici si nécessaire
        this.selectedJournalTasks = journals; // Assurez-vous que selectedJournalTasks est défini pour accepter des objets de type Journal
        console.log(this.selectedJournalTasks);
      });
  }
}
