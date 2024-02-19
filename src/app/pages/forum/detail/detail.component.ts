import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [ForumService]
})
export class DetailComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  question: any;
  responses: any[];

  constructor(private route: ActivatedRoute, private forumService: ForumService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Invoices' }, { label: 'Detail', active: true }];
    this.route.paramMap.subscribe(params => {
      const questionId = params.get('id');
      if (questionId) {
        this.loadQuestionAndResponses(questionId);
      }
    });
  }

  loadQuestionAndResponses(questionId: string): void {
    this.forumService.getQuestionById(questionId).subscribe(data => {
      this.question = data;
      this.loadResponses(questionId);
      console.log("Question loaded successfully");
    });
  }

  loadResponses(questionId: string): void {
    this.forumService.getResponseForQuestion(questionId).subscribe(responses => {
      this.responses = responses;
    });
  }

  onAddResponse(): void {
    // Reload question and responses after adding a new response
    this.loadQuestionAndResponses(this.question.id);
  }
}
