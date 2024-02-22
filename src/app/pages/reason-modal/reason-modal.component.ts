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

  constructor(public activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.dismiss(this.selectedReason);
  }

  sendReason() {
    this.activeModal.close(this.selectedReason);
  }
}
