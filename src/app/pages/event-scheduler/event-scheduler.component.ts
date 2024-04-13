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
    events: [] // Initialisation vide, sera rempli avec les événements chargés
  };

  constructor(private dialog: MatDialog, private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(events => {
      // Transformez chaque événement récupéré pour correspondre à la structure attendue par FullCalendar
      const formattedEvents: EventInput[] = events.map(event => ({
        title: event.text,
        start: event.start_date,
        end: event.end_date,
        id: event.id
      }));
  
      // Mettez à jour les options de FullCalendar avec les événements chargés
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
  
        // Vérifiez d'abord si this.calendarOptions.events est défini et est un tableau
        if (Array.isArray(this.calendarOptions.events)) {
          // Ajoutez le nouvel événement au tableau existant
          this.calendarOptions.events.push(formattedEvent);
        } else {
          // Initialisez la liste des événements avec le nouvel événement
          this.calendarOptions.events = [formattedEvent];
        }
      }
    });
  }
  
}