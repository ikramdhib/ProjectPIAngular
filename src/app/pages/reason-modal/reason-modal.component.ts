import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reason-modal',
  templateUrl: './reason-modal.component.html',
  styleUrls: ['./reason-modal.component.scss']
})
export class ReasonModalComponent {
  @Input() reasons: string[] = [];
  selectedReason: string = '';
  otherReason: string = '';

  constructor(public activeModal: NgbActiveModal) { }
  closeModal() {
    this.activeModal.dismiss(this.selectedReason);
  }

  sendReason() {
    if (this.selectedReason === 'Autre') {
      // Si "Autre" est sélectionné, envoyez la raison saisie dans la zone de texte
      this.activeModal.close(this.otherReason);
    } else {
      // Sinon, envoyez simplement la raison sélectionnée dans le sélecteur
      this.activeModal.close(this.selectedReason);
    }
  }
}
