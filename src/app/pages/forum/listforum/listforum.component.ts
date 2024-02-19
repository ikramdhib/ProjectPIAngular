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
  breadCrumbItems: Array<{}>;
  constructor(private forumService:ForumService,
    private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
      this.breadCrumbItems = [{ label: 'Question' }, { label: 'All', active: true }];
      this.forumService.getQuestions().subscribe((datas: Question[]) => { // Utilisez Question[] pour le typage
        this.questions = datas.map(question => ({
          ...question,
          content: this.sanitizer.bypassSecurityTrustHtml(question.content)
        }));
      }, error => {
        console.error('Erreur lors de la récupération des questions : ', error);
      });
    }
 }