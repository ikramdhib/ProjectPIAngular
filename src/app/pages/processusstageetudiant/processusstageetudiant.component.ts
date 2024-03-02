import { Component, OnInit, ViewChild } from "@angular/core";
import { StageService } from "../../services/stage.service";
import { DemandeService } from "src/app/services/demande.service";
import { DemandestageComponent } from "../demandestage/demandestage.component";
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

import { UntypedFormGroup, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";


import { HttpClient } from '@angular/common/http';
import { DatePipe } from "@angular/common";
import { JournalService } from "src/app/services/journal.service";
import { Observable, startWith } from "rxjs";



@Component({
  selector: "app-processusstageetudiant",
  templateUrl: "./processusstageetudiant.component.html",
  styleUrls: ["./processusstageetudiant.component.scss"],
})
export class ProcessusstageetudiantComponent implements OnInit {


  // bread crumb items
  breadCrumbItems: Array<{}>;
  files: File[] = [];

  form: FormGroup;

  stages: any[] = [];
  userId: string = '65d7b036577f851e1873aa10'; // Remplacez par l'ID de l'utilisateur

  currentStage: any; // Variable pour stocker le stage actuelle en cours de modification
  currentTache: any;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  updateForm: FormGroup;
  updateFormTache: FormGroup;
  @ViewChild('updateContent') updateContent: any; // Déclaration de la propriété updateContent de type ViewChild
  @ViewChild('updateContent2') updateContent2: any;


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form File Upload', active: true }];

    this.getStagesForUser();
  }

  showTacheFormMap: { [stageId: string]: boolean } = {};
  showTacheForm: boolean = false;

  selectedStage: any;

  // Ajoutez la méthode pour afficher ou masquer le formulaire tacheForm pour un stage spécifique
  toggleTacheForm(stageId: string) {
    this.stageService.isJournalAssociated(stageId).subscribe((isAssociated) => {
      if (isAssociated) {
        this.selectedStage = this.stages.find((stage) => stage.id === stageId);
        this.showTacheFormMap[stageId] = !this.showTacheFormMap[stageId];
        // S'il y a un journal associé, inversez l'état du formulaire
        this.showTacheForm = !this.showTacheForm;
      } else {
        // S'il n'y a pas de journal associé, affichez un message d'alerte avec Toaster
        this.toastr.warning('Ajoutez un journal svp!', 'Alerte');
      }
    });
  }

  selectedJournalId: string | null = null;

  addJournal(stage: any) {
    // Obtenez l'ID du stage
  const stageId = stage.id;
  // Appelez votre service backend pour vérifier si un journal est associé à ce stage
  this.stageService.isJournalAssociated(stageId)
    .subscribe((isAssociated) => {
      if (isAssociated) {
        // Un journal est déjà associé à ce stage, affichez un message d'erreur
        this.toastr.error('Un stage peut avoir un seul journal', 'Erreur');
      } else {
        // Aucun journal n'est associé, appelez votre service backend pour ajouter un journal
        this.journalService.addJournal(stageId)
          .subscribe((response) => {
            console.log('Journal ajouté avec succès', response);
            this.toastr.success('Journal ajouté avec succès', 'Succès');

            // Stockez l'ID du journal dans formJournal si nécessaire
            this.selectedJournalId = response.id;
          }, (error) => {
            // Traitez les erreurs si nécessaire
            console.error('Erreur lors de l\'ajout du journal', error);
          });
      }
    }, (error) => {
      // Traitez les erreurs si nécessaire lors de la vérification de l'association du journal
      console.error('Erreur lors de la vérification de l\'association du journal', error);
    });
  }

  onTacheFormSubmit() {
    
    console.log("Stage selectionné est " ,this.selectedStage);
  
    // Reste du code de votre fonction onSubmitTacheForm ici
    const formData2 = this.tacheForm.value;
    console.log("FormData:", formData2);

    // Vérifiez si le stage a un journal lié
    if (!this.selectedStage.journal || !this.selectedStage.journal.id) {
      console.error("Le stage sélectionné n'a pas de journal associé");
    return;
    }

    // Vérifiez si la date de la tâche est comprise entre la date de début et de fin du stage
    const dateTache = new Date(formData2.date);
    const dateDebutStage = new Date(this.selectedStage.startAt);
    const dateFinStage = new Date(this.selectedStage.endAt);

    if (dateTache < dateDebutStage || dateTache > dateFinStage) {
      console.error("La date de la tâche doit être entre la date de début et de fin du stage");
      this.toastr.error('La date de la tâche doit être entre la date de début et de fin du stage', 'Erreur');
      this.clearFormTache();
      return;
    }

    const journalId = this.selectedStage.journal.id;
    console.log("ID du journal associé au stage :", journalId);

    this.journalService.addTacheWithJournal(formData2, journalId).subscribe(
      (response: any) => {
        this.showTacheFormMap[this.selectedStage.id] = false;
        this.clearFormTache();
        this.toastr.success('Tâche ajoutée avec succès!', 'Succès');

      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la Tâche:', error);
        this.toastr.error('Erreur lors de l\'ajout de la Tâche', 'Erreur');
      }
    );
  }

  taches: any[] = [];


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

  showTachesMap: { [key: string]: boolean } = {};

  toggleTaches(stageId: string): void {
    this.showTachesMap[stageId] = !this.showTachesMap[stageId];
  }

  

  


  resetForm() {
    // Réinitialisez le formulaire des tâches si nécessaire
    this.form.reset();
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



  utilisateurData: any;

  demandeDeStageContent: string;

  // Initialisation du formulaire
  stageForm: FormGroup;

  tacheForm: FormGroup;

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


      this.tacheForm = this.fb.group({
        date: ['', Validators.required],
        libelle: ['', Validators.required],
      });

      this.updateFormTache = this.fb.group({
        date: ['', Validators.required],
        libelle: ['', Validators.required],
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

  openUpdateModalTache(tache: any) {
    this.currentTache = tache; 
    const formattedDate = this.datePipe.transform(tache.date, 'yyyy-MM-dd');
    this.updateFormTache.patchValue({
      date: formattedDate,
      libelle: tache.libelle,
    });
    this.modalRef2 = this.modalService.show(this.updateContent2); 

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

  updateTache() {
    
    if (this.updateFormTache.valid && this.currentTache) {
      const updatedTache = { ...this.currentTache, ...this.updateFormTache.value }; 

      console.log('Données :', updatedTache); // Ajoutez cette ligne

      this.journalService.updateTache(this.currentTache.id, updatedTache).subscribe(
        response => {
          console.log('Réponse du serveur :', response); // Ajoutez cette ligne
          this.toastr.success('Tàche mis à jour avec succès', 'Succès');
          this.showTaches(this.currentTache.journal.id);
          this.modalRef2.hide();
        },
        error => {
          console.error('Erreur lors de la mise à jour de tàche :', error);
          this.toastr.error('Une erreur s\'est produite lors de la mise à jour de tàche', 'Erreur');
        }
      );
    }
  }

  deleteStage(stage: any): void {
    if (confirm('Voulez-vous vraiment supprimer ce stage ?')) {
      this.toastr.success('Stage supprimé avec succès', 'Succès');
      this.stageService.deleteStage(stage.id).subscribe(
        response => {
          console.log('Stage supprimé avec succès:', response);
          this.getStagesForUser();
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
    // Assurez-vous que le contenu est construit avant de générer le PDF
   this.construireDemandeDeStageContent();

    setTimeout(() => { // Utilisez setTimeout pour s'assurer que le contenu est mis à jour
    const element = document.getElementById('contenuPdf'); // ID de l'élément contenant votre contenu HTML
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        format: 'a4',
        orientation: 'portrait',
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 10, -10, pdfWidth, pdfHeight);
      pdf.save('demande_stage.pdf');
    });
  }, 500);
  }

  clearForm() {
    this.stageForm.reset(); // Cette méthode réinitialise tous les champs du formulaire
  }

  clearFormTache(){
    this.tacheForm.reset();
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

      this.toastr.success('Stage ajoutée avec succès', 'Succès');
      this.clearForm();
      this.getStagesForUser();
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



  

  



