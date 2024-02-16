import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private apiUrl = 'http://localhost:8081/api/demandes';  // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getAllDemandes() {
    return this.http.get<any[]>(`${this.apiUrl}/demandes`);
  }

  getDemandeById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/demandes/${id}`);
  }

  createDemande(demandeData: any) {
    return this.http.post<any>(`${this.apiUrl}/CreateDemande`, demandeData);
  }
}
