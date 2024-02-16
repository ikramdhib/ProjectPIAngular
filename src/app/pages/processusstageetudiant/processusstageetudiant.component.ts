import { Component, OnInit } from '@angular/core';
import { StageService } from '../../services/stage.service';
import { DemandeService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-processusstageetudiant',
  templateUrl: './processusstageetudiant.component.html',
  styleUrls: ['./processusstageetudiant.component.scss']
})
export class ProcessusstageetudiantComponent implements OnInit {



    // Propriétés liées aux champs du formulaire
    nomSociete: string = "";
    numSociete: string = "";
    emailSociete: string = "";
    nomCoach: string = "";
    prenomCoach: string = "";
    numCoach: string = "";
    emailCoach: string = "";
    startAt: string = "";
    endAt: string = "";
    type: string = "";

    // bread crumb items
  breadCrumbItems: Array<{}>;
  files: File[] = [];

  demandeDeStageContent: string;
  
    constructor(private stageService: StageService, private demandeService: DemandeService) {}


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form File Upload', active: true }];
  }

  // File Upload
  imageURL: any;
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    let file: File = event.addedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      setTimeout(() => {
        // this.profile.push(this.imageURL)
      }, 100);
    }
    reader.readAsDataURL(file)
  }

  afficherDemandeDeStage(): void {
    this.demandeService.getDemandeDeStageContent()
      .subscribe((content: string) => {
        this.demandeDeStageContent = content;
      });
  }

  
    // Méthode appelée lors de la soumission du formulaire
    onSubmit(event: Event) {
      event.preventDefault();
  
      const formData = {
        nomSociete: this.nomSociete,
        numSociete: this.numSociete,
        emailSociete: this.emailSociete,
        nomCoach: this.nomCoach,
        prenomCoach: this.prenomCoach,
        numCoach: this.numCoach,
        emailCoach: this.emailCoach,
        startAt: this.startAt, // Convertir la date en chaîne ISO
        endAt: this.endAt,
        type: this.type,
      };

  
      try {
        // Afficher la chaîne JSON dans la console avant l'envoi
        console.log("FormData:", formData);
        console.log("JSON Stringify:", JSON.stringify(formData));
  
        // Utilisez le service pour envoyer les données au backend
        this.stageService.ajouterStage(formData).subscribe((response : any) => {
          console.log("Succès de l'ajout du stage");
          // Ajoutez ici d'autres actions si nécessaire
        });
      } catch (error) {
        console.error("Erreur dans onSubmit:", error);
      }


    }
}
