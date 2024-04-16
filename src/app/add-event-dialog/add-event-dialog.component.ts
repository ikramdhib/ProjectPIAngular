import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
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

  @Output() eventAdded: EventEmitter<SchedulerEvent> = new EventEmitter<SchedulerEvent>();

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
      const event: SchedulerEvent = {
        ...this.eventForm.value,
        title: this.eventForm.value.text
      };
  
      // Ici, vous devez obtenir userId à partir de quelque part
      const userId = '65d739fc2b0fe31a0239beb9'; // Remplacez '123' par la méthode appropriée pour obtenir l'ID de l'utilisateur
  
      this.eventService.createEvent(event, userId).subscribe(newEvent => {
        this.eventAdded.emit(newEvent);
        this.dialogRef.close();
      });
    }
  }
  

  onCancelClick(): void {
    this.dialogRef.close();
  }
}