import { Component, OnInit } from '@angular/core';
import { Question } from '../Question';
import { ForumService } from '../forum.service';

@Component({
  selector: 'app-list-favoris',
  templateUrl: './list-favoris.component.html',
  styleUrls: ['./list-favoris.component.scss']
})
export class ListFavorisComponent implements OnInit {
  favoris: Question[] = [];
  responseCounts: { [questionId: string]: number } = {};
  userId: string = '65d5faf88ecbf72fd4d359f2'; 
  breadCrumbItems: Array<{}>;
  constructor(private forumService:ForumService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Favoris' }, { label: 'Question Grid', active: true }];
    this.forumService.getListFavoris(this.userId).subscribe(
      (questions) => {
        this.favoris = questions;
        this.loadResponseCounts();
      },
      (error) => {
        console.error('Erreur lors de la récupération des favoris:', error);
      }
    );
    
   
  }
  loadResponseCounts(): void {
    this.favoris.forEach(question => {
      this.forumService.getNbReponse(question.id).subscribe(
        (count) => {
          this.responseCounts[question.id] = count; // Stockez le nombre de réponses
        },
        (error) => {
          console.error(`Erreur lors de la récupération du nombre de réponses pour la question ${question.id}:`, error);
          this.responseCounts[question.id] = 0; // En cas d'erreur, considérez 0 réponses
        }
      );
    });
  }

}
