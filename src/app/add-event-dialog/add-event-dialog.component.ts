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
      const event = {
        ...this.eventForm.value,
        title: this.eventForm.value.text // Assurez-vous que 'text' est le nom du champ du titre dans votre formulaire
      };
  
      // Appel au service pour créer l'événement, puis fermeture de la boîte de dialogue avec l'événement créé
      this.eventService.createEvent(event).subscribe(newEvent => {
        this.dialogRef.close(newEvent);
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}