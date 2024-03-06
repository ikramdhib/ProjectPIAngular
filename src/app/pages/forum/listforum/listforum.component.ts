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
  responseCounts: { [questionId: string]: number } = {};
  breadCrumbItems: Array<{}>;
  filteredQuestions: any[] = []; // Tableau pour les questions filtrées
  searchTerm: string = ''; 
  favoris: Question[] = [];
  userId: string; 
  currentUser:any;

  constructor(private forumService:ForumService,
    private sanitizer: DomSanitizer) { }

    ngOnInit(): void {

      this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
    if(this.currentUser){
      this.userId=this.currentUser.id;
    }
      
      this.breadCrumbItems = [{ label: 'Question' }, { label: 'All', active: true }];
      this.forumService.getQuestions().subscribe((datas: Question[]) => { // Utilisez Question[] pour le typage
        this.questions = datas.map(question => ({
          ...question,
          content: this.sanitizer.bypassSecurityTrustHtml(question.content)
        }));
        this.filteredQuestions = this.questions;
        this.loadResponseCounts();
        
      }, error => {
        console.error('Erreur lors de la récupération des questions : ', error);
      });
      this.forumService.getListFavoris(this.userId).subscribe(
        (favoris) => {
          this.favoris = favoris;
        },
        (error) => {
          console.error('Erreur lors de la récupération des favoris :', error);
        }
      );
      
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
