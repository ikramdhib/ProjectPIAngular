import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JournaleServiceService } from 'src/app/journale-service.service';
import { StageService } from 'src/app/stage.service';
import { UserServiceService } from 'src/app/user-service.service';
//import * as $ from 'jquery'; // Importer jQuer
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReasonModalComponent } from '../reason-modal/reason-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  
  
  rejectionReason: string = '';
  tacheId: string = '';

  currentUser:any ;
  userId:any;

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
    this.Stage.getStagesByEncadrantId(this.userId).subscribe(
      (data: any) => {
        this.stages = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des stages : ', error);
      }
    );
  }
  tacheValidee: boolean = false;
  disableRefusButton: boolean = false;

 
  validerTache(tacheId: string) {
    this.Stage.validateTask(tacheId).subscribe(
      (validated: boolean) => {
        if (validated) {
          // Mettre à jour le statut de la tâche à "Valide" si elle est validée avec succès
          const tache = this.taches.find(t => t.id === tacheId);
          if (tache) {
            tache.status = 'Valide'; // Mettez ici le statut souhaité après validation
            tache.disabled = true; // Désactiver les boutons pour cette tâche
          }
  
          // Désactiver le bouton de refus
          const tachesNonValidees = this.taches.filter(t => t.status !== 'Valide');
          if (tachesNonValidees.length === 0) {
            // S'il n'y a plus de tâches non validées, désactivez le bouton de refus
            this.disableRefusButton = true;
          }
  
          console.log('Tâche validée avec succès');
        } else {
          console.log('Échec de la validation de la tâche');
        }
      },
      (error) => {
        console.error('Erreur lors de la validation de la tâche : ', error);
  
        // Mettre à jour le statut de la tâche en cas d'erreur
        const tache = this.taches.find(t => t.id === tacheId);
        if (tache) {
          tache.status = 'Valide'; // Mettez ici le statut souhaité en cas d'erreur
          tache.disabled = true; // Désactiver les boutons pour cette tâche
        }
  
        // Désactiver le bouton de refus
        const tachesNonValidees = this.taches.filter(t => t.status !== 'Valide');
        if (tachesNonValidees.length === 0) {
          // S'il n'y a plus de tâches non validées, désactivez le bouton de refus
          this.disableRefusButton = true;
        }
      }
    );
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
  currentDate: Date = new Date(); // Déclaration de la propriété currentDate
  isRapportAccessible(rapportDate: string): boolean {
    // Convertissez la date de rapport en objet Date
    const reportDateObject: Date = new Date(rapportDate);

    // Vérifiez si la date actuelle est supérieure ou égale à la date de rapport
    return this.currentDate >= reportDateObject;
  }
  isAttestationAccessible(attestationDate: string): boolean {
    // Convertissez la date de rapport en objet Date
    const attestationDateObject: Date = new Date(attestationDate);

    // Vérifiez si la date actuelle est supérieure ou égale à la date de rapport
    return this.currentDate >= attestationDateObject;
  }
  ngOnInit(): void {
    this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
    if(this.currentUser){
      this.userId=this.currentUser.id;
    
    this.userList.getStudentsBySupervisor(this.userId).subscribe(
      students => {
        this.students = students;
      },
     error => {
        console.error('Error fetching students:', error);
      }
    );
    this.getStagesForUser();
  }
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
            // Met à jour le statut de la tâche à "Refusée" dans le tableau taches
            const tache = this.taches.find(t => t.id === this.tacheId);
            if (tache) {
              tache.status = 'NValide';
              tache.disabled = true; // Désactive les boutons pour cette tâche
            }
            // Réinitialise la raison du rejet et l'ID de la tâche une fois le rejet réussi
            this.rejectionReason = '';
            this.tacheId = null;
            // Ajoutez ici toute logique supplémentaire à effectuer après le rejet de la tâche
          },
          (error) => {
            console.error('Erreur lors du rejet de la tâche:', error);
            // Gérer les erreurs de rejet de la tâche
            const tache = this.taches.find(t => t.id === this.tacheId);
            if (tache) {
              tache.status = 'NValide';
              tache.disabled = true; // Désactive les boutons pour cette tâche
            }
            // Réinitialise la raison du rejet et l'ID de la tâche une fois le rejet réussi
            this.rejectionReason = '';
            this.tacheId = null;
            // Ajoutez ici toute logique supplémentaire à effectuer après le rejet de la tâche
          
          }
        );
    } else {
      console.error('La raison du rejet est vide ou aucune tâche sélectionnée');
      // Gérer le cas où aucune raison n'est saisie ou aucune tâche n'est sélectionnée
    }
}


redirectToAttestationStage(student: any): void {
  if (student && student.id && student.stageId) {
    // Naviguer vers la page AttestationComponent avec les données de l'étudiant
    this.router.navigate(['/attestation-stage', student.id, student.stageId]);
  } else {
    console.error('Impossible de rediriger vers la page d\'attestation : Données d\'étudiant invalides');
  }
}

downloadRapprtDeStage(userId: string): void {
  this.Stage.downloadRapportDeStage(userId).subscribe(
    (data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Rapport_de_stage.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error => {
      console.error('Erreur lors du téléchargement du rapport de stage :', error);
    }
  );
}

}