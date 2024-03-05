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

  createDemande(demandeData: FormData) {
    const headers = new HttpHeaders();  // No need to set content-type explicitly for FormData
    
    console.log(demandeData);
    
    return this.http.post('http://localhost:8081/file/add', demandeData, { headers });
  }
  
  
  
}
