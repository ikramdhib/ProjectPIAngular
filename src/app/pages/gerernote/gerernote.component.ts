import { Component, OnInit } from '@angular/core';
import { number } from 'echarts';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-gerernote',
  templateUrl: './gerernote.component.html',
  styleUrls: ['./gerernote.component.scss']
})
export class GerernoteComponent implements OnInit {


  constructor(private userService:UserServiceService,private toastr: ToastrService){}


  // Propriétés pour stocker les IDs de l'étudiant et de l'encadrant
  studentId: string = '';
  encadrantId: string = '';

  motivationNote: string = ''; // Par défaut, aucune note n'est sélectionnée
  techniqueNote: string = '';
  communicationNote: string = '';
  apprentissageNote: string = '';
  professionnalismeNote: string = '';


  // Fonctions pour gérer la sélection d'une note pour chaque critère
  handleMotivationSelection(note: string) {
    this.motivationNote = note;
  }

  handleTechniqueSelection(note: string) {
    this.techniqueNote = note;
  }

  handleCommunicationSelection(note: string) {
    this.communicationNote = note;
  }

  handleApprentissageSelection(note: string) {
    this.apprentissageNote = note;
  }

  handleProfessionnalismeSelection(note: string) {
    this.professionnalismeNote = note;
  }

  
  students: any[] = [];
  notes: any[] = [];

  ngOnInit(): void {
    const encadrantId = '65fb3f9b12606c2f28507ae8';
    this.userService.getStudentsBySupervisor(encadrantId).subscribe(
      students => {
        this.students = students;
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );

  }

  getNoteByStudent(): void {
    const premierEtudiantId = this.students[0].id;
    this.userService.getNotesByStudentId(premierEtudiantId).subscribe(
      notes => {
        this.notes = notes;
    });
  }

  // Déclaration de la variable pour contrôler la visibilité du tableau
showGrille: boolean = false;

// Méthode pour afficher le tableau lors du clic sur le bouton "Grille"
showGrilleTable(studentId: string): void {
  this.showGrille = true;
  // Récupérer l'ID de l'étudiant
    console.log("ID de l'étudiant affiché :", studentId);

    // Assigner l'ID de l'étudiant à la propriété du composant
    this.studentId = studentId;
    // Assigner l'ID de l'encadrant (votre propre ID par exemple)
    this.encadrantId = '65fb3f9b12606c2f28507ae8';
}

showAppreciationNoteSection: boolean = false;

showGrilleTable2(): void {
  this.showAppreciationNoteSection = true;
}

showSyntheseNoteSection: boolean = false;

showGrilleTable3(): void {
  this.showSyntheseNoteSection = true;
}

noteEncadrAcadem: number;
noteApprecGlob: number;
noteExpert: number;
noteEncadrantPro:number;

calculateEncadrantAcademNote(): void {
  // Votre logique pour le calcul de la note encadrant académique
  const noteRdvPedag = this.previousTotalNotes; // Normaliser la note RDV pédagogiques sur une échelle de 0 à 1
  const noteApprecGlobNormalized = this.noteApprecGlob; // Normaliser la note d'appréciation globale sur une échelle de 0 à 1
  this.noteEncadrAcadem = (noteRdvPedag * 0.8) + (noteApprecGlobNormalized * 0.2); // Appliquer le poids des deux notes
}


assignNote(): void {

  let nouvelleNoteId: string;

  // Vérifier si toutes les notes ont été sélectionnées
  if (!this.motivationNote || !this.techniqueNote || !this.communicationNote || !this.apprentissageNote || !this.professionnalismeNote) {
    this.toastr.warning("Merci de cocher une note pour chaque critère", "Erreur");
    return; // Arrêter l'exécution de la fonction si une note est manquante
  }

  // Récupérer l'ID du premier étudiant associé à l'encadrant
  const premierEtudiantId = this.students[0].id;

  // Calculer la somme des notes
  this.updateTotalNotes();

  // Récupérer la valeur de note_apprec_glob depuis l'input
  const noteApprecGlob = parseInt((<HTMLInputElement>document.getElementById('note-apprec-glob-input')).value);
  const noteExpert = parseInt((<HTMLInputElement>document.getElementById('note-expert-input')).value);
  const noteEncadrantPro = parseInt((<HTMLInputElement>document.getElementById('note-encadrant-pro-input')).value);

  const noteEncadrAcadem = this.calculateEncadrantAcademNote();

  // Calculer la note finale d'encadrement selon la formule donnée
  const noteFinaleEncadrement = (this.noteEncadrAcadem * 0.4) + (noteExpert * 0.4) + (noteEncadrantPro * 0.2);


  // Créez un nouvel objet Note et initialisez ses propriétés avec les valeurs des notes
  const Note = {

    crit_Mot_Aut: this.mapNoteValue(this.motivationNote),
    crit_Com_Tech: this.mapNoteValue(this.techniqueNote),
    crit_Com_Commu: this.mapNoteValue(this.communicationNote),
    crit_GestT_Apprentiss: this.mapNoteValue(this.apprentissageNote),
    crit_Profess_QualiT: this.mapNoteValue(this.professionnalismeNote),
    note_rdv_pedag: this.totalNotes,// Ajouter la variable totalNotes à l'objet Note
    note_apprec_glob: noteApprecGlob,  // Ajouter la valeur de note_apprec_glob
    note_encadr_academ: this.noteEncadrAcadem,
    note_expert: noteExpert,
    note_encadr_profess: noteEncadrantPro,
    note_finale: noteFinaleEncadrement // Ajouter la note finale calculée
  };
  
  this.toastr.success("Note enregistrée avec succès", "Succès");
  console.log('Note enregistrée avec succès:');

  // Réinitialisez les notes après l'enregistrement
  this.resetNotes();

  // Remplacez 'votre_id_etudiant' et 'votre_id_encadrant' par les ID réels de l'étudiant et de l'encadrant
  this.userService.assignNoteToStudent(premierEtudiantId, '65fb3f9b12606c2f28507ae8', Note )
    .subscribe(response => {
      console.log('ID de la note ajoutée:', response.id);
      nouvelleNoteId = response.id;
      
    }, error => {
      console.error('Erreur lors de l\'enregistrement de la note:', error);
    });

    console.log("Valeur de totalNotes avant le clic sur le bouton 'Attribuer' :", this.previousTotalNotes);
    console.log(noteEncadrAcadem);
 
}

// Fonction pour mapper les valeurs des notes aux entiers correspondants
mapNoteValue(note: string): number {
  switch (note) {
    case 'excellent':
      return 4;
    case 'tres_bien':
      return 3;
    case 'bien':
      return 2;
    case 'assez_bien':
      return 1;
    default:
      return 0; // Valeur par défaut si aucune note n'est sélectionnée
  }
}

// Fonction pour réinitialiser les notes après l'enregistrement
resetNotes(): void {
  this.motivationNote = '';
  this.techniqueNote = '';
  this.communicationNote = '';
  this.apprentissageNote = '';
  this.professionnalismeNote = '';
  this.totalNotes = 0;
}

totalNotes: number = 0;

previousTotalNotes: number;

updateTotalNotes(): void {
  // Convertir les notes en nombres en utilisant la fonction mapNoteValue
  const motivationNoteValue = this.mapNoteValue(this.motivationNote);
  const techniqueNoteValue = this.mapNoteValue(this.techniqueNote);
  const communicationNoteValue = this.mapNoteValue(this.communicationNote);
  const apprentissageNoteValue = this.mapNoteValue(this.apprentissageNote);
  const professionnalismeNoteValue = this.mapNoteValue(this.professionnalismeNote);

  // Calculer la somme des notes
  this.totalNotes = motivationNoteValue + techniqueNoteValue + communicationNoteValue + apprentissageNoteValue + professionnalismeNoteValue;
  this.previousTotalNotes = this.totalNotes;
}




}
