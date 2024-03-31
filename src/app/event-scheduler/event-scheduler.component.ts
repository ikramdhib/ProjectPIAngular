import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { SchedulerEvent } from '../models/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-scheduler',
  templateUrl: './event-scheduler.component.html',
  styleUrls: ['./event-scheduler.component.scss']
})
export class EventSchedulerComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [] as any[] // Initialize events as an empty array of any type
  };

  constructor(private eventService: EventService, private dialog: MatDialog) {}

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  openCreateEventPopup() {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '400px',
      data: { title: '', date: '' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.title && result.date) {
        const newEvent: SchedulerEvent = {
          id: 'generated_id',
          text: result.title,
          start_date: result.date,
          end_date: result.date // Pour simplifier, utilisez la même date pour start_date et end_date
        };

        if (Array.isArray(this.calendarOptions.events)) {
          this.calendarOptions.events.push(newEvent);
        } else {
          console.error('Invalid events type:', this.calendarOptions.events);
        }
      } else {
        console.error('Invalid event data:', result);
      }
    });
  }
}