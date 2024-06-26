import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Type } from '../listeoffreencadrant/offremodel';
import { MyUploadAdapter } from './my-upload-adapter';
import { LinkedinScraperService } from 'src/app/linkedin-scraper.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offrestage.component.html',
  styleUrls: ['./offrestage.component.scss']
})
export class OffreComponent {

  offres: any[] = [];
  

  userId:any;
  currentUser:any;
  dureeN: any;
  currentOffreID = '';
  imgURL: any;
  types = Type;
  nouvelleOffre: any 
  uploadAdapter: any;
  hashtagsInput: string = '';
  lienLinkedIn: string = 'https://www.linkedin.com/jobs/view/3846717106/?alternateChannel=search%26refId=MMsd3LyyezHn22Zxf6A2eg%3D%3D%26trackingId=PEwLSDyPUWNAA0AhbUE2bg%3D%3D';

  constructor(private http: HttpClient, private toastr: ToastrService, private linkedInScraperService: LinkedinScraperService) {
    this.uploadAdapter = new MyUploadAdapter(http);
    this.getAllOffres();
  }
  ngOnInit() {
    this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
    if(this.currentUser){
      this.userId=this.currentUser.id;
   this.nouvelleOffre= {
      nomEntreprise: this.currentUser.company,
      image: '',
      nomEncadrant: this.currentUser.firstName,
      prenomEncadrant: this.currentUser.lastName,
      email: this.currentUser.emailPro,
      lienLinkedIn: '' ,// Initialisation du champ lienLinkedIn
      userIdF:this.userId,
      description: '',
      datedebut_stage: this.formatDate(new Date()),
      datefin_stage: this.formatDate(new Date()),
      type: 'FORMATION_HUMAINE_SOCIALE,IMMERSION_ENTREPRISE,INGENIEUR',
      duree: 0,
      hashtags: []
  
    };
  }
  }
 
  

  checkIfSoftwareEngineeringOffer(description: string): void {
    this.linkedInScraperService.isSoftwareEngineeringOffer(description)
      .subscribe(isOffer => {
        if (isOffer) {
          this.toastr.success('Cette description correspond à une offre de stage informatique');

          console.log('Cette description correspond à une offre de stage informatique');
          // Traitement spécifique si l'offre correspond à une offre d'ingénierie logicielle
        } 
          this.toastr.error('Cette description ne correspond à une offre de stage informatique');

          console.log('Cette description ne correspond pas à une offre de stage informatique');
          // Traitement spécifique si l'offre ne correspond pas à une offre d'ingénierie logicielle
        
      });
  }

  onSubmit() {
    if (!this.nouvelleOffre.nomEntreprise ||
      !this.nouvelleOffre.nomEncadrant ||
      !this.nouvelleOffre.prenomEncadrant ||
      !this.nouvelleOffre.email ||
      //!this.nouvelleOffre.description ||
      !this.nouvelleOffre.datedebut_stage ||
      !this.nouvelleOffre.datefin_stage ||
      !this.nouvelleOffre.type ||
      this.nouvelleOffre.hashtags.length === 0) {
      this.toastr.error('Veuillez remplir tous les champs.', 'Erreur');
      return;
    }
  
    if (!this.validateEmail(this.nouvelleOffre.email)) {
      this.toastr.error('Veuillez saisir une adresse email valide.', 'Erreur');
      return;
    }
  
   
  
    // Appel du scraping de discussion
    this.scrapeLinkedIn();
    //this.checkIfSoftwareEngineeringOffer();
  }

scrapeLinkedIn(): void {
    this.linkedInScraperService.scrapeLinkedIn(this.lienLinkedIn)
      .subscribe(descriptions => {
        console.log('Descriptions extraites :', descriptions);
        // Attribution des descriptions au champ de description
        this.nouvelleOffre.description = descriptions.join('\n'); // Mettre les descriptions dans une chaîne séparée par des sauts de ligne
        this.checkIfSoftwareEngineeringOffer(this.nouvelleOffre.description);

        // Après avoir extrait la description, ajouter l'offre
        this.addOffre();
      }, error => {
        console.error('Erreur lors du scraping de LinkedIn :', error);
        // Gestion de l'erreur
      });
  }

addOffre() {
  let x = this.calculateDuration() as any;
  if (x < 60) {
    this.toastr.error('La durée du stage doit être d\'au moins 2 mois.', 'Erreur');
    return;
  }

  console.log(this.nouvelleOffre.userIdF,"9999999999999000000000000");
    const formData = new FormData();
    formData.append('nomEntreprise', this.nouvelleOffre.nomEntreprise);
    formData.append('image', this.nouvelleOffre.image);
    formData.append('nomEncadrant', this.nouvelleOffre.nomEncadrant);
    formData.append('prenomEncadrant', this.nouvelleOffre.prenomEncadrant);
    formData.append('email', this.nouvelleOffre.email);
    formData.append('description', this.nouvelleOffre.description);
    formData.append('userId', this.nouvelleOffre.userIdF);
    formData.append('datedebut_stage', this.nouvelleOffre.datedebut_stage);
    formData.append('datefin_stage', this.nouvelleOffre.datefin_stage);
    formData.append('type', this.nouvelleOffre.type);
    formData.append('duree', x);
    formData.append('hashtags', this.nouvelleOffre.hashtags);
  
    // Envoi de la requête POST après le scraping
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

  
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nouvelleOffre.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imgURL = reader.result;
      };
      reader.readAsDataURL(file);
    }
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

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
  }

  calculateDuration() {
    const startDate = new Date(this.nouvelleOffre.datedebut_stage);
    const endDate = new Date(this.nouvelleOffre.datefin_stage);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return this.dureeN = diffDays;
  
  }

  onStartDateChange(): void {
    this.calculateDuration();
  }

  onEndDateChange(): void {
    this.calculateDuration();
  }

  clearForm(): void {
    this.nouvelleOffre = {
      nomEntreprise: '',
      image: '',
      nomEncadrant: '',
      prenomEncadrant: '',
      email: '',
      description: '',
      datedebut_stage: this.formatDate(new Date()),
      datefin_stage: this.formatDate(new Date()),
      type: '',
      duree: '',
      hashtags: []
    };
    this.imgURL = null;
  }

  getImageUrl(imageName: string): string {
    return 'http://localhost:8081/api/offres/images/${imageName}';
  }

  addHashtag(event: KeyboardEvent) {
    const hashtagText = (event.target as HTMLInputElement).value;
    if (event.key === 'Enter' && hashtagText.trim() !== '') {
      this.nouvelleOffre.hashtags.push(hashtagText.trim());
      this.hashtagsInput = '';
    }
  }

}