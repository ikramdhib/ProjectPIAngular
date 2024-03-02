import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttestationServiceService {
  constructor(private http: HttpClient) {}

 
  addAttestationToStage(stageId: string, encadrantId: string, etudiantId: string, pdfData: FormData, htmlContent: string): Observable<any> {
    // Créer un nouvel objet FormData pour envoyer les données au backend
    const formData = new FormData();
    formData.append('pdfFile', pdfData.get('pdfFile')); // Récupérer le fichier PDF de FormData
    formData.append('htmlContent', htmlContent); // Ajouter le contenu HTML
    
    // Envoyer la requête POST vers le backend avec les données de l'attestation
    return this.http.post<any>(`http://localhost:8081/${stageId}/addAttestation/${encadrantId}/${etudiantId}`, formData);
  }
  downloadAttestation(stageId: string, encadrantId: string, studentId: string) {
    return this.http.get(`http://localhost:8081/${stageId}/downloadAttestation/${encadrantId}/${studentId}`, { responseType: 'blob' });
  }

 
}
