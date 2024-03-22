import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-gerernote',
  templateUrl: './gerernote.component.html',
  styleUrls: ['./gerernote.component.scss']
})
export class GerernoteComponent implements OnInit {

  constructor(private userService:UserServiceService,private toastr: ToastrService,){}


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


assignNote(): void {

  // Vérifier si toutes les notes ont été sélectionnées
  if (!this.motivationNote || !this.techniqueNote || !this.communicationNote || !this.apprentissageNote || !this.professionnalismeNote) {
    this.toastr.warning("Merci de cocher une note pour chaque critère", "Erreur");
    return; // Arrêter l'exécution de la fonction si une note est manquante
  }

  // Créez un nouvel objet Note et initialisez ses propriétés avec les valeurs des notes
  const Note = {

    crit_Mot_Aut: this.mapNoteValue(this.motivationNote),
    crit_Com_Tech: this.mapNoteValue(this.techniqueNote),
    crit_Com_Commu: this.mapNoteValue(this.communicationNote),
    crit_GestT_Apprentiss: this.mapNoteValue(this.apprentissageNote),
    crit_Profess_QualiT: this.mapNoteValue(this.professionnalismeNote)
  };
  
  this.toastr.success("Note enregistrée avec succès", "Succès");
  console.log('Note enregistrée avec succès:');
  // Réinitialisez les notes après l'enregistrement
  this.resetNotes();

  // Remplacez 'votre_id_etudiant' et 'votre_id_encadrant' par les ID réels de l'étudiant et de l'encadrant
  this.userService.assignNoteToStudent('65c3d6f5e969ef6cc82524c0', '65fb3f9b12606c2f28507ae8', Note )
    .subscribe(response => {
      
    }, error => {
      console.error('Erreur lors de l\'enregistrement de la note:', error);
    });
}

// Fonction pour mapper les valeurs des notes aux entiers correspondants
mapNoteValue(note: string): number {
  switch (note) {
    case 'excellent':
      return 5;
    case 'tres_bien':
      return 4;
    case 'bien':
      return 3;
    case 'assez_bien':
      return 2;
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
}


}
