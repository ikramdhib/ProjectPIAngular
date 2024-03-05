import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-form-component',
  templateUrl: './comment-form-component.component.html',
  styleUrls: ['./comment-form-component.component.scss']
})
export class CommentFormComponentComponent {
  @Input() offreId: string;
  @Output() addComment = new EventEmitter<{ offreId: string, commentaireText: string }>();
  nouveauCommentaireText: string = '';

  onSubmit(): void {
    if (this.nouveauCommentaireText.trim() !== '') {
      this.addComment.emit({ offreId: this.offreId, commentaireText: this.nouveauCommentaireText });
      this.nouveauCommentaireText = ''; // Réinitialisation du champ de saisie
    }
  }
}

