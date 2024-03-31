import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkedinScraperService {

  constructor(private http: HttpClient) { }

  // scrapeLinkedIn(lienLinkedIn: string): Observable<string[]> {
  //   // Créer un objet avec la propriété lienLinkedIn
  //   const requestBody = { lienLinkedIn: lienLinkedIn };
  //   // Envoyer la requête HTTP POST avec le corps de la requête correctement formaté
  //   return this.http.post<string[]>('http://localhost:8081/api/offres/scrape-linkedin', requestBody)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Une erreur s\'est produite lors du scraping de LinkedIn :', error);
  //         return throwError('Erreur lors du scraping de LinkedIn');
  //       })
  //     );
  // }
 
  scrapeLinkedIn(linkedinProfileUrl: string): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:8081/api/offres/scrape-linkedin`, { params: { lienLinkedIn: linkedinProfileUrl } });
  }

  

  isSoftwareEngineeringOffer(description: string): Observable<boolean> {
    const keywords = ['informatique', 'développeur', 'stage', 'programmation','Angular','springboot','skills','Backend','Frontend'];
    const isOffer = keywords.some(keyword => description.toLowerCase().includes(keyword));
    return new Observable<boolean>(observer => {
      observer.next(isOffer);
      observer.complete();
    });
  }
}
