import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

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
  onDeleteResponse(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this response!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.forumService.deleteResponse(id).subscribe({
          next: () => {
            // Logique pour gérer la suppression réussie (par exemple, mise à jour de la liste des réponses)
            Swal.fire(
              'Deleted!',
              'Your response has been deleted.',
              'success'
            );
            this.loadResponses(this.question.id);
          },
          error: (error) => {
            // Gérer l'erreur de suppression ici
            console.error('Error deleting response: ', error);
          }
        });
      }
    });
  }
  
}
