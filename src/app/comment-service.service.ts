import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommentOffre } from './pages/listeoffreetudiant/CommentOffre';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  private apiUrl: string = 'http://localhost:8081/api/commentaires';
  private nouveauCommentaireAjouteSubject: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<CommentOffre[]> {
    return this.http.get<CommentOffre[]>(this.apiUrl);
  }
  ajouterCommentaire(userId: string, offreId: string, nouveauCommentaire: CommentOffre): Observable<any> {
    // Logique pour ajouter le commentaire...
    // Une fois que le commentaire est ajouté avec succès, émettre un événement
    this.nouveauCommentaireAjouteSubject.next();
    return this.http.post<any>(`${this.apiUrl}/ajouterEtAffecterAUtilisateurEtOffre/${userId}/${offreId}`, nouveauCommentaire);
  }

  getNouveauCommentaireAjouteObservable(): Observable<void> {
    return this.nouveauCommentaireAjouteSubject.asObservable();
  }
  

  ajouterEtAffecterAUtilisateurEtOffre(userId: string, offreId: string, comment: CommentOffre): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/ajouterEtAffecterAUtilisateurEtOffre/${userId}/${offreId}`, comment);
  }
  
   getCommentsByOffre(offreId: string): Observable<CommentOffre[]> {
    return this.http.get<CommentOffre[]>(`http://localhost:8081/api/commentaires/byOffre/${offreId}`);
  }

}
