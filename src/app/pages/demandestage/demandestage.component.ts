import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-demandestage',
  templateUrl: './demandestage.component.html',
  styleUrls: ['./demandestage.component.scss']
})
export class DemandestageComponent {

  demandeDeStageContent: string;

  constructor(private http: HttpClient) {}

  loadDemandeDeStageContent() {
    this.http.get('./assets/demandestage.component.html', { responseType: 'text' })
      .subscribe(
        (htmlContent: string) => {
          this.demandeDeStageContent = htmlContent;
        },
        error => {
          console.error('Erreur lors du chargement du contenu du fichier HTML', error);
        }
      );
  }

}
