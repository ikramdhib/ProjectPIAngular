import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  historiques: any []= [];
  userId: string = '65d5faf88ecbf72fd4d359f2';
  constructor(private forumService:ForumService){}
  ngOnInit(): void {
    this.loadHistorique();
  }
  loadHistorique(): void {
    this.forumService.getHistoriqueByUser(this.userId)
      .subscribe(data => {
        this.historiques = data.map(historique => ({ ...historique, selected: false }));
      });
  }
  supprimerSelectionnes() {
    // Filtrer pour ne garder que les éléments non sélectionnés
    //this.historiques = this.historiques.filter(historique => !historique['selected']);
    const suppressionObservables = this.historiques
    .filter(historique => historique.selected)
    .map(historique => {
      return this.forumService.deleteHistorique(historique.id);
    });

  // Exécuter toutes les suppressions en parallèle
  forkJoin(suppressionObservables).subscribe(results => {
    // Mettre à jour l'affichage pour enlever les entrées supprimées
    this.historiques = this.historiques.filter(historique => !historique.selected);
  }, error => {
    // Gérer les erreurs ici
    console.error('Une erreur est survenue lors de la suppression', error);
  });
  }
  
  
  
}

