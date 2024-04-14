import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offre } from './models/offre'; 
import { User } from './models/user'; // Assurez-vous d'importer correctement le modèle d'utilisateur

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private apiUrl = 'http://localhost:8081/api/demandes';
  private fileUrl = 'http://localhost:8081/file'; // URL pour les fichiers

  constructor(private http: HttpClient) { }

  getAllDemandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetListDemande`);
  }

  getDemandeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetDemande/${id}`);
  }

  createDemande(demandeData: FormData): Observable<any> {
    // Pas besoin de définir les HttpHeaders pour FormData
    return this.http.post(`${this.fileUrl}/add`, demandeData);
  }

  getOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.fileUrl}/GetOffres`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.fileUrl}/GetAllUsers`);
  }
}
