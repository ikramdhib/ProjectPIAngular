import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offre } from './models/offre'; 

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

  createDemande(demandeData: any): Observable<any> {
    // Pas besoin de définir les HttpHeaders pour FormData
    return this.http.post(`http://localhost:8081/file/addFile`, demandeData);
  }

  getOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.fileUrl}/GetOffres`);
  }

  getRequestWithOffreId(id:any){
    return this.http.get(`${this.apiUrl}/demandes/getDemandesOffre/${id}`)
  }

  
  
}