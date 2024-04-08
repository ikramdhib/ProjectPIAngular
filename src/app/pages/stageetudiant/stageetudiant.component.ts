import { Component } from "@angular/core";
import { StageService } from "../../services/stage.service";

@Component({
  selector: "app-stageetudiant",
  templateUrl: "./stageetudiant.component.html",
  styleUrls: ["./stageetudiant.component.scss"],
})
export class StageetudiantComponent {
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

  constructor(private stageService: StageService) {}

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
