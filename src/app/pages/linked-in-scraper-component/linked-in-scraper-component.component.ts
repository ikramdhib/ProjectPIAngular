import { Component } from '@angular/core';
import { LinkedinScraperService } from 'src/app/linkedin-scraper.service';

@Component({
  selector: 'app-linked-in-scraper-component',
  templateUrl: './linked-in-scraper-component.component.html',
  styleUrls: ['./linked-in-scraper-component.component.scss']
})
export class LinkedInScraperComponentComponent {
  linkedinProfileUrl: string = '';
  scrapedDescriptions: string[] = [];

  constructor(private linkedInScrapingService: LinkedinScraperService) { }

  scrapeLinkedIn(): void {
    if (this.linkedinProfileUrl) {
      this.linkedInScrapingService.scrapeLinkedIn(this.linkedinProfileUrl)
        .subscribe(descriptions => {
          this.scrapedDescriptions = descriptions;
        },
        error => {
          console.error('Erreur lors du raclage de LinkedIn :', error);
        });
    } else {
      console.warn('Veuillez saisir une URL de profil LinkedIn.');
    }
  }
}

