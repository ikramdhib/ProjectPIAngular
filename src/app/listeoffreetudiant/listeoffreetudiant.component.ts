import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listeoffreetudiant',
  templateUrl: './listeoffreetudiant.component.html',
  styleUrls: ['./listeoffreetudiant.component.scss']
})
export class ListeoffreetudiantComponent implements OnInit {

  offresByEntreprise: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getOffresByEntreprise();
  }

  getOffresByEntreprise(): void {
    this.http.get<any>('http://localhost:8081/api/offres/byEntreprise')
      .subscribe(
        (data: any) => {
          this.offresByEntreprise = data;
        },
        (error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des offres :', error);
        }
      );
  }
}
