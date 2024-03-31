import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core'; // Importez Output et EventEmitter
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { SchedulerEvent } from '../models/event';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent implements OnInit {
  eventForm: FormGroup;

  @Output() eventAdded: EventEmitter<SchedulerEvent> = new EventEmitter<SchedulerEvent>(); // Déclaration de la propriété eventAdded

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) {
    this.eventForm = this.formBuilder.group({
      text: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSaveClick(): void {
    if (this.eventForm.valid) {
      const eventData: SchedulerEvent = {
        id: '', // Générer un ID ou utiliser une autre méthode
        text: this.eventForm.value.text,
        start_date: this.eventForm.value.start_date,
        end_date: this.eventForm.value.end_date
      };

      this.eventService.createEvent(eventData).subscribe(newEvent => {
        this.dialogRef.close(newEvent);
        this.eventAdded.emit(newEvent); // Émettre un événement lorsque l'événement est ajouté avec succès
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}