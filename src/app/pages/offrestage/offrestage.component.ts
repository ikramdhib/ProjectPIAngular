import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Type } from './offremodel';

@Component({
  selector: 'app-offre',
  templateUrl: './offrestage.component.html',
  styleUrls: ['./offrestage.component.scss']
})
export class OffreComponent {

  offres: any[] = [];
  nouvelleOffre: any = {
    nomEntreprise: '',
    logoentreprise: '',
    nomEncadrant: '',
    prenomEncadrant: '',
    email: '',
    description: '',
    datedebut_stage: this.formatDate(new Date()),
    datefin_stage: this.formatDate(new Date()),
    type: 'FORMATION_HUMAINE_SOCIALE,IMMERSION_ENTREPRISE,INGENIEUR', // Add this line
    // Ajoutez cette ligne


  };

  currentOffreID = '';
  imgURL: any; // Déclaration de la propriété imgURL
  types = Type; // Assigning the enum to a variable accessible in the template

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.getAllOffres();
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('nomEntreprise', this.nouvelleOffre.nomEntreprise);
    formData.append('file', this.nouvelleOffre.logoentreprise);
    formData.append('nomEncadrant', this.nouvelleOffre.nomEncadrant);
    formData.append('prenomEncadrant', this.nouvelleOffre.prenomEncadrant);
    formData.append('email', this.nouvelleOffre.email);
    formData.append('description', this.nouvelleOffre.description);
    formData.append('userId', '65cbd3246188fc097c303ae0'); // Remplacez 'your_user_id' par l'ID de l'utilisateur
    formData.append('datedebut_stage', this.nouvelleOffre.datedebut_stage);
    formData.append('datefin_stage', this.nouvelleOffre.datefin_stage);
    formData.append('type', this.nouvelleOffre.type);
    formData.append('duree',this.nouvelleOffre.duree);
 // Calcul de la durée du stage
    const startDate = new Date(this.nouvelleOffre.datedebut_stage);
    const endDate = new Date(this.nouvelleOffre.datefin_stage);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.nouvelleOffre.duree = diffDays;
    

    this.calculateDuration();

    

  
    this.http.post<any>('http://localhost:8081/api/offres/add', formData).subscribe(
      response => {
        this.toastr.success('Offre ajoutée avec succès', 'Succès');
        this.getAllOffres();
        this.clearForm();
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'offre :', error);
        this.toastr.error('Une erreur s\'est produite lors de l\'ajout de l\'offre', 'Erreur');
      }
    );
  }
  

  getAllOffres(): void {
    this.http.get('http://localhost:8081/api/offres')
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          this.offres = resultData;
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des offres :', error);
        }
      );
  }

  setUpdate(data: any): void {
    this.nouvelleOffre = { ...data };
    this.currentOffreID = data._id;
  }

  onLogoChange(event: any) {
    const file = event?.target?.files[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      console.error('Le fichier sélectionné n\'est pas une image.');
      return;
    }

    const maxSizeInBytes = 10 * 1024 * 1024; // 10 Mo (modifiable selon vos besoins)
    if (file.size > maxSizeInBytes) {
      console.error('La taille du fichier est trop importante.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.nouvelleOffre.logoentreprise = file;
      this.imgURL = reader.result;
    };
    reader.readAsDataURL(file);
  }

  deleteOffre(data: any) {
    this.http.delete(`http://localhost:8081/api/offres/delete/${data._id}`, { responseType: 'text' }).subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.toastr.success('Offre supprimée avec succès', 'Succès');
        this.getAllOffres();
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de l\'offre :', error);
        this.toastr.error('Une erreur s\'est produite lors de la suppression de l\'offre', 'Erreur');
      }
    );
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();

    // Ajouter un zéro en tête si le mois ou le jour est inférieur à 10
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
  }

  // Méthode pour calculer la durée entre les dates de début et de fin
  calculateDuration(): void {
    const startDate = new Date(this.nouvelleOffre.datedebut_stage);
    const endDate = new Date(this.nouvelleOffre.datefin_stage);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.nouvelleOffre.duree = diffDays;
  }

  // Méthode appelée lorsque la date de début est modifiée
  onStartDateChange(): void {
    this.calculateDuration();
  }

  // Méthode appelée lorsque la date de fin est modifiée
  onEndDateChange(): void {
    this.calculateDuration();
  }
  clearForm(): void {
    this.nouvelleOffre = {
      nomEntreprise: '',
      logoentreprise: '',
      nomEncadrant: '',
      prenomEncadrant: '',
      email: '',
      description: '',
      datedebut_stage: this.formatDate(new Date()),
      datefin_stage: this.formatDate(new Date()),
      type: '',
      duree: ''
    };
    this.imgURL = null; // Réinitialiser l'image prévisualisée
  }
}
