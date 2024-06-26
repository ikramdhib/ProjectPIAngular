// Exemple de service fictif (vous devez créer un service réel pour communiquer avec le backend)
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, map, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StageService {
  private apiUrl = "http://localhost:8081"; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  // Exemple de méthode pour envoyer les données au backend
  ajouterStage(data: any, userId:any): Observable<any> {
    // Ajoutez des en-têtes pour gérer CORS

    return this.http.post(
      `http://localhost:8081/ajouterEtAffecterStageAUtilisateur/${userId}`,
      data,
      this.httpOptions
    ).pipe(
      map((response: any) => response.data) // Supposez que votre API renvoie un objet avec une propriété 'data'
    );
  }

  getStagesByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
  
  updateStage(stageId: string, updatedStage: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateStage/${stageId}`, updatedStage);
  }

  deleteStage(stageId: string): Observable<any> {
    const url = `${this.apiUrl}/${stageId}`;
    return this.http.delete(url);
  }

  isJournalAssociated(stageId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/isJournalAssociated/${stageId}`);
  }
  
  uploadRapportPdf(stageId: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`http://localhost:8081/${stageId}/rapportPdf`, formData);
  }

  isRapportExiste(stageId: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8081/${stageId}/rapportExiste`);
  }

  downloadAttestation(stageId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/attestationstage/${stageId}`, { responseType: 'blob' as 'json' });
  }

}