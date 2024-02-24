import { Component, OnInit, ViewChild } from "@angular/core";
import { StageService } from "../../services/stage.service";
import { DemandeService } from "src/app/services/demande.service";
import { DemandestageComponent } from "../demandestage/demandestage.component";


import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

import { UntypedFormGroup, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";


import { HttpClient } from '@angular/common/http';
import { DatePipe } from "@angular/common";
import { JournalService } from "src/app/services/journal.service";



@Component({
  selector: "app-processusstageetudiant",
  templateUrl: "./processusstageetudiant.component.html",
  styleUrls: ["./processusstageetudiant.component.scss"],
})
export class ProcessusstageetudiantComponent implements OnInit {


  // bread crumb items
  breadCrumbItems: Array<{}>;
  files: File[] = [];

  form: UntypedFormGroup;

  stages: any[] = [];
  userId: string = '65d7b036577f851e1873aa10'; // Remplacez par l'ID de l'utilisateur

  currentStage: any; // Variable pour stocker le stage actuelle en cours de modification

  modalRef: BsModalRef;
  updateForm: FormGroup;
  @ViewChild('updateContent') updateContent: any; // Déclaration de la propriété updateContent de type ViewChild


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form File Upload', active: true }];

    this.formData().push(this.field());

    this.getStagesForUser();
  }

  showForm = false;

  // Fonction pour basculer l'état et afficher/cacher le formulaire
  toggleForm() {
    this.showForm = !this.showForm;
  }


  addJournal(stage: any) {
    // Logique pour ajouter un journal ici
    console.log('Ajouter journal pour le stage :', stage);
    
    this.journalService.addJournalForStage(stage.id).subscribe(
      (result) => {
        console.log('Journal ajouté avec succès :', result);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du journal :', error);
      }
    );
  }


  formData(): UntypedFormArray {
    return this.form.get('formlist') as UntypedFormArray;
  }

  field(): UntypedFormGroup {
    return this.fb.group({
      name: '',
      email: '',
      subject: '',
      file: '',
      msg: '',
    });
  }

  /**
   * Remove field from form
   * @param i specified index to remove
   */
  removeField(i: number) {
    if (confirm('Are you sure you want to delete this element?')) {
      this.formData().removeAt(i);
    }
  }


  /**
   * Add field in form
   */
  addField() {
    this.formData().push(this.field());
  }

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


  constructor(private journalService: JournalService,private datePipe: DatePipe,private http: HttpClient,private stageService: StageService, private demandeService: DemandeService,private fb: FormBuilder, private toastr: ToastrService,private modalService: BsModalService,private ufb: UntypedFormBuilder) {
    
    
      this.form = this.ufb.group({
        formlist: this.ufb.array([]),
      }),
    
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

      this.updateForm = this.fb.group({
        nomSociete: ['', Validators.required],
        numSociete: ['', [Validators.required, numericValidator]],
        emailSociete: ['', [Validators.required, Validators.email]],
        nomCoach: ['', Validators.required],
        prenomCoach: ['', Validators.required],
        numCoach: ['', [Validators.required, numericValidator]],
        emailCoach: ['', [Validators.required, Validators.email]],
        startAt: ['', Validators.required],
        endAt:['', Validators.required],
        type:['', Validators.required],
        
      });
    
  }


  getStagesForUser() {
    this.stageService.getStagesByUserId(this.userId).subscribe(
      (data: any) => {
        this.stages = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des stages : ', error);
      }
    );
  }


  openUpdateModal(stage: any) {
    this.currentStage = stage; 
    // Formatez les dates avant de les affecter au formulaire
    const formattedStartDate = this.datePipe.transform(stage.startAt, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(stage.endAt, 'yyyy-MM-dd');
    this.updateForm.patchValue({
      nomSociete: stage.nomSociete,
      numSociete: stage.numSociete,
      emailSociete: stage.emailSociete,
      nomCoach: stage.nomCoach,
      prenomCoach: stage.prenomCoach,
      numCoach: stage.numCoach,
      emailCoach: stage.emailCoach,
      startAt: formattedStartDate, 
      endAt: formattedEndDate,
      type: stage.type
    });
    this.modalRef = this.modalService.show(this.updateContent); 

  }

  updateStage() {
    
    if (this.updateForm.valid && this.currentStage) {
      const updatedStage = { ...this.currentStage, ...this.updateForm.value }; 
      console.log('Données :', updatedStage); // Ajoutez cette ligne

      this.stageService.updateStage(this.currentStage.id, updatedStage).subscribe(
        response => {
          console.log('Réponse du serveur :', response); // Ajoutez cette ligne
          this.toastr.success('Stage mis à jour avec succès', 'Succès');
          this.getStagesForUser();
          this.modalRef.hide();
        },
        error => {
          console.error('Erreur lors de la mise à jour de stage :', error);
          this.toastr.error('Une erreur s\'est produite lors de la mise à jour de stage', 'Erreur');
        }
      );
    }
  }

  deleteStage(stage: any): void {
    if (confirm('Voulez-vous vraiment supprimer ce stage ?')) {
      this.stageService.deleteStage(stage.id).subscribe(
        response => {
          console.log('Stage supprimé avec succès:', response);
          this.toastr.success('Stage supprimé avec succès', 'Succès');
          // Ajoutez ici le code pour rafraîchir la liste des stages ou effectuer d'autres actions nécessaires
        },
        error => {
          console.error('Erreur lors de la suppression du stage :', error);
          // Ajoutez ici le code pour gérer l'erreur ou afficher un message à l'utilisateur
        }
      );
    }
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

  

  



