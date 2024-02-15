import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listeoffreetudiant',
  templateUrl: './listeoffreetudiant.component.html',
  styleUrls: ['./listeoffreetudiant.component.scss']
})
export class ListeoffreetudiantComponent implements OnInit {
  offresByEntreprise: any; // Votre liste d'offres initiale
  filteredOffresByEntreprise: any; // Liste d'offres filtrée
  types: string[] = ['Stage technique', 'Stage professionnel', 'Stage de recherche']; // Exemple de types de stage disponibles
  filteredValue: string = ''; // Valeur de recherche

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getOffresByEntreprise();
  }

  getOffresByEntreprise(): void {
    this.http.get<any>('http://localhost:8081/api/offres/byEntreprise')
      .subscribe(
        (data: any) => {
          this.offresByEntreprise = data;
          // Assurez-vous de copier les données récupérées dans filteredOffresByEntreprise également
          this.filteredOffresByEntreprise = this.offresByEntreprise;
        },
        (error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des offres :', error);
        }
      );
  }

  applyFilter(value: string) {
    this.filteredValue = value.trim().toLowerCase();
    this.filterOffres();
  }

  applyTypeFilter(type: string) {
    if (type === 'Tous les types') {
      this.filteredOffresByEntreprise = this.offresByEntreprise;
    } else {
      this.filteredOffresByEntreprise = this.offresByEntreprise.filter((offre: any) => offre.type === type);
    }
  }

  filterOffres() {
    this.filteredOffresByEntreprise = this.offresByEntreprise.filter((offre: any) =>
      offre.nomEntreprise.toLowerCase().includes(this.filteredValue) ||
      offre.nomEncadrant.toLowerCase().includes(this.filteredValue) ||
      offre.prenomEncadrant.toLowerCase().includes(this.filteredValue) ||
      offre.email.toLowerCase().includes(this.filteredValue) ||
      offre.description.toLowerCase().includes(this.filteredValue)
    );
  }

  clearSearch() {
    this.filteredValue = '';
    this.filterOffres();
  }
}