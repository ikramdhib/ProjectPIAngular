import { Component, OnInit } from "@angular/core";
import { StageService } from "../../services/stage.service";
import { DemandeService } from "src/app/services/demande.service";
import { DemandestageComponent } from "../demandestage/demandestage.component";

import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ToastrService } from "ngx-toastr";



@Component({
  selector: "app-processusstageetudiant",
  templateUrl: "./processusstageetudiant.component.html",
  styleUrls: ["./processusstageetudiant.component.scss"],
})
export class ProcessusstageetudiantComponent {

  utilisateurData: any;

  demandeDeStageContent: string;

  // Initialisation du formulaire
  stageForm: FormGroup;

  // Propriétés liées aux champs du formulaire
  nomSociete: string = "";
  numSociete: string = "";
  emailSociete: string = "";
  nomCoach: string = "";
  prenomCoach: string = "";
  numCoach: string = "";
  emailCoach: string = "";
  startAt: Date = new Date();
  endAt: Date = new Date();
  type: string = "";


  constructor(private stageService: StageService, private demandeService: DemandeService,private fb: FormBuilder, private toastr: ToastrService) {
    // Création du formulaire avec les champs et les validateurs
    this.stageForm = this.fb.group({
      nomSociete: ['', Validators.required],
      numSociete: ['', [Validators.required, numericValidator]],
      emailSociete: ['', [Validators.required, Validators.email]],
      nomCoach: ['', Validators.required],
      prenomCoach: ['', Validators.required],
      numCoach: ['', [Validators.required, numericValidator]],
      emailCoach: ['', [Validators.required, Validators.email]],
      startAt: ['', Validators.required],
      endAt: ['', Validators.required],
      type: ['', Validators.required],
      // Ajoutez d'autres champs avec leurs validateurs ici
      // ...
    });
  }

  // affichage de demande de stage

  afficherDemandeDeStage() {
    const userId = '65d7b036577f851e1873aa10'; // Remplacez par l'id de l'utilisateur que vous souhaitez récupérer

    this.demandeService.getUserById(userId).subscribe(
      (data) => {
        this.utilisateurData = data;
        this.construireDemandeDeStageContent();
      },
      (error) => {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    );
  }


  private construireDemandeDeStageContent() {
    this.demandeService.getDemandeStageContent().subscribe(
      (content) => {
        // Injectez les données de l'utilisateur dans le contenu récupéré
        const updatedContent = content.replace('{{studentName}}', `${this.utilisateurData.firstName || ''} ${this.utilisateurData.lastName || ''}`);
        this.demandeDeStageContent = updatedContent.replace('{{studentInfo}}', this.utilisateurData.level || '');
      },
      (error) => {
        console.error('Erreur lors de la récupération du contenu de demande_stage.html:', error);
      }
    );
  }


  telechargerPDF() {
    this.demandeService.telechargerPDF(this.demandeDeStageContent).subscribe(
        (data: any) => {
            const blob = new Blob([data], { type: 'application/pdf' });
            saveAs(blob, 'demande_stage.pdf');
        },
        (error) => {
            console.error('Erreur lors du téléchargement du PDF :', error);
        }
    );
}
  clearForm() {
    this.stageForm.reset(); // Cette méthode réinitialise tous les champs du formulaire
  }


  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {

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

    if (this.stageForm.valid) {
      const formData = this.stageForm.value; 

    try {
      // Afficher la chaîne JSON dans la console avant l'envoi
      console.log("FormData:", formData);
      console.log("JSON Stringify:", JSON.stringify(formData));

      this.toastr.success('Offre ajoutée avec succès', 'Succès');
      this.clearForm();
      // Utilisez le service pour envoyer les données au backend
      this.stageService.ajouterStage(formData).subscribe((response: any) => {
        console.log("Succès de l'ajout du stage");
      });

    } catch (error) {
      console.error("Erreur dans onSubmit:", error);
    }
  }
  else {
    // Affichez des messages d'erreur appropriés si nécessaire
    console.log("Formulaire invalide. Veuillez corriger les erreurs.");
  }
  
  }
}

  function numericValidator(control: AbstractControl): { [key: string]: any } | null {
     const isNumeric = !isNaN(parseFloat(control.value)) && isFinite(control.value);
     return isNumeric ? null : { 'numeric': { value: control.value } };
   }

  function saveAs(blob: Blob, arg1: string) {
  throw new Error("Function not implemented.");
  }

  



