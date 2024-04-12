import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Question } from '../Question';

@Component({
  selector: 'app-listforum',
  templateUrl: './listforum.component.html',
  styleUrls: ['./listforum.component.scss'],
  providers: [ ForumService]
})
export class ListforumComponent implements OnInit {
  questions : any[];
  page: number = 0;
  size: number= 10;
  totalPages: number = 0;
  totalElements: number = 0;
  responseCounts: { [questionId: string]: number } = {};
  breadCrumbItems: Array<{}>;
  filteredQuestions: any[] = []; // Tableau pour les questions filtrées
  searchTerm: string = ''; 
  favoris: Question[] = [];
  userId: string = '65d5faf88ecbf72fd4d359f2'; 

  constructor(private forumService:ForumService,
    private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
      
      this.breadCrumbItems = [{ label: 'Question' }, { label: 'All', active: true }];
        this.loadQuestions();
        
    }
    loadQuestions(): void {
      this.forumService.getQuestions(this.page, this.size).subscribe(data => {
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.questions = data.content.map(question => ({
          ...question,
          content: this.sanitizer.bypassSecurityTrustHtml(question.content)
        }));
        this.filteredQuestions = this.questions;
        this.loadResponseCounts(); 
      }, error => {
        console.error('Erreur lors de la récupération des questions : ', error);
      });
    }
    loadResponseCounts(): void {
      this.questions.forEach(question => {
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
    nextPage(): void {
      if (this.page < this.totalPages - 1) {
        this.page++;
        this.loadQuestions();
      }
    }
  
    previousPage(): void {
      if (this.page > 0) {
        this.page--;
        this.loadQuestions();
      }
    }
    filterQuestions(): void {
      console.log("Filtering with searchTerm:", this.searchTerm);
      if (!this.searchTerm) {
        this.filteredQuestions = this.questions; 
      } else {
        this.filteredQuestions = this.questions.filter(question =>
          question.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          question.tags.some(tag => tag.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
         
        );
      }
    }
    isFavorite(questionId: string): boolean {
      return this.favoris.some(favQuestion => favQuestion.id === questionId);
    }
  }
