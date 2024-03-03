import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private apiUrl = 'http://localhost:8081/api/demandes';

  constructor(private http: HttpClient) { }

  getAllDemandes() {
    return this.http.get<any[]>(`${this.apiUrl}/GetListDemande`);
  }

  getDemandeById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/GetDemande/${id}`);
  }

  createDemande(demandeData: any) {
    // Remove the explicit creation of HttpHeaders
    // const headers = new HttpHeaders();
    // headers.set('Content-Type', 'multipart/form-data');
  
    return this.http.post<any>(`${this.apiUrl}/CreateDemande`, demandeData);
  }
  
  
}
