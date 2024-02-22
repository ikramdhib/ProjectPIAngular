import { Component } from '@angular/core';
import { StageService } from '../../stage.service';
import { ToastrService } from 'ngx-toastr';
import { ReasonModalComponent } from '../reason-modal/reason-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stage-listt',
  templateUrl: './stage-listt.component.html',
  styleUrls: ['./stage-listt.component.scss']
})
export class StageListtComponent {
  stages: any[] = [];
  originalStages: any[] = []; // Stocke les stages originaux non filtrés
  studentId: string = '';
  reason: string = ''; // Déclarez la propriété reason pour stocker la raison

  constructor(private stageService: StageService,private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadStages();
  }

  loadStages() {
    this.stageService.getAllStagesWithUserNames().subscribe(data => {
      this.originalStages = []; // Réinitialiser les stages originaux
      this.stages = []; // Réinitialiser les stages affichés
      Object.entries(data).forEach(([info, userName], index) => {
        // Utiliser des expressions régulières pour extraire les détails du stage
        const stageDetails = this.extractStageDetails(info);
        if (stageDetails) {
          const stage = {
            id: index + 1,
            ...stageDetails,
            userName: userName
          };
          this.originalStages.push(stage); // Ajouter le stage aux stages originaux
          this.stages.push(stage); // Ajouter le stage aux stages affichés
        }
      });
    });
  }
  
  // Méthode pour extraire les détails du stage à partir de la chaîne info
  extractStageDetails(info: string): any {
    // Expression régulière pour extraire les informations du stage
    const regex = /id=(.*?), startAt=(.*?), endAt=(.*?), type=(.*?), nomCoach=(.*?), prenomCoach=(.*?), numCoach=(.*?), emailCoach=(.*?), user=(.*?)\)/;
    const match = info.match(regex);
    if (match && match.length === 10) {
      return {
        id: match[1],
        startAt: match[2],
        endAt: match[3],
        type: match[4],
        nomCoach: match[5],
        prenomCoach: match[6],
        numCoach: match[7],
        emailCoach: match[8]
      };
    }
    return null;
  }

  // Méthode pour filtrer les stages en fonction de l'ID de l'étudiant
  filterStages() {
    if (this.studentId.trim() !== '') {
      this.stages = this.originalStages.filter(stage => stage.userName === this.studentId);
    } else {
      this.stages = [...this.originalStages]; // Si l'ID est vide, afficher tous les stages
    }
  }

  sendEmailToEncadrant(stageId: string) {
    this.stageService.sendEmailToEncadrant(stageId).subscribe(
      response => {
        console.log('Email envoyé à l\'encadrant avec succès.', response);
        this.deleteStageFromList(stageId); // Supprimer l'entrée de la liste
        this.toastr.success('Email envoyé à l\'encadrant avec succès.');
      },
      success => {
      
        this.toastr.success('envoie avec succes');
        // Afficher un message d'erreur à l'utilisateur ou effectuer d'autres actions nécessaires
      }
    );
    setTimeout(() => {
      this.loadStages(); // Charger à nouveau la liste des stages
    }, 2000);
  
  }
  deleteStageFromList(stageId: string) {
    // Filtrer la liste pour exclure l'entrée avec l'ID donné
    this.stages = this.stages.filter(stage => stage.id !== stageId);
  }
  sendEmailToStudent(stageId: string) {
    this.openReasonModal(stageId);
  }

  // Méthode pour ouvrir la fenêtre modale de sélection de la raison
  openReasonModal(stageId: string) {
    const modalRef = this.modalService.open(ReasonModalComponent);
    modalRef.result.then((reason) => {
      if (reason) {
        this.sendEmailToStudentWithReason(stageId, reason);
      } else {
        this.toastr.error('Veuillez sélectionner une raison pour la non-validation.');
      }
    }, () => {
      console.log('Modal dismissed');
    });
  }
  

  // Méthode pour envoyer l'e-mail à l'étudiant avec la raison de non-validation
  sendEmailToStudentWithReason(stageId: string, reason: string) {
    this.stageService.sendEmailToStudent(stageId).subscribe(
      () => {
        console.log("E-mail envoyé à l'étudiant avec succès.");
        this.toastr.success("E-mail envoyé à l'étudiant avec succès.");
        // Ajoutez ici une logique pour afficher un message à l'utilisateur si nécessaire
      },
      (error) => {
        console.error("Une erreur s'est produite lors de l'envoi de l'e-mail à l'étudiant:", error);
        this.toastr.error("Erreur lors de l'envoi de l'e-mail à l'étudiant.");
        // Ajoutez ici une logique pour afficher un message d'erreur à l'utilisateur si nécessaire
      }
    );
  }
}
