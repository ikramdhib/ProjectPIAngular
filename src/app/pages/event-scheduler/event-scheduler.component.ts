import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from '../../add-event-dialog/add-event-dialog.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { SchedulerEvent } from '../../models/event';
import { EventService } from '../../services/event.service';
@Component({
  selector: 'app-event-scheduler',
  templateUrl: './event-scheduler.component.html',
  styleUrls: ['./event-scheduler.component.scss']
})
export class EventSchedulerComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [] // Initialisation vide, sera remplie avec les événements chargés
  };

  constructor(private dialog: MatDialog, private eventService: EventService) {}

  ngOnInit() {
    this.loadAllEvents();

    // Écouter les événements ajoutés depuis le service d'événements
    this.eventService.onEventAdded().subscribe(newEvent => {
      const formattedEvent: EventInput = {
        title: newEvent.text,
        start: newEvent.start_date,
        end: newEvent.end_date,
        id: newEvent.id
      };

      if (Array.isArray(this.calendarOptions.events)) {
        this.calendarOptions.events.push(formattedEvent);
      } else {
        this.calendarOptions.events = [formattedEvent];
      }
    });
  }

  loadAllEvents() {
    this.eventService.getEvents().subscribe(events => { // Mise à jour pour getEvents
      const formattedEvents: EventInput[] = events.map(event => ({
        title: event.text,
        start: event.start_date,
        end: event.end_date,
        id: event.id // Supposant que event.id est l'identifiant unique des événements
      }));

      this.calendarOptions.events = formattedEvents;
    });
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  openCreateEventPopup() {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(newEvent => {
      if (newEvent) {
        const formattedEvent: EventInput = {
          title: newEvent.text,
          start: newEvent.start_date,
          end: newEvent.end_date,
          id: newEvent.id
        };

        if (Array.isArray(this.calendarOptions.events)) {
          this.calendarOptions.events.push(formattedEvent);
        } else {
          this.calendarOptions.events = [formattedEvent];
        }

        // Émettre l'événement ajouté à partir du service pour que d'autres composants puissent le détecter
        this.eventService.emitEventAdded(newEvent);
      }
    });
  }
}