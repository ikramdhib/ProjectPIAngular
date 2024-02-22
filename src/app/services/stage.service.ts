// Exemple de service fictif (vous devez créer un service réel pour communiquer avec le backend)
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StageService {
  private apiUrl = "http://localhost:8081/api/stages"; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  // Exemple de méthode pour envoyer les données au backend
  ajouterStage(data: any): Observable<any> {
    // Ajoutez des en-têtes pour gérer CORS

    return this.http.post(
      `http://localhost:8081/api/stages/ajouterEtAffecterStageAUtilisateur/65d7b036577f851e1873aa10`,
      data,
      this.httpOptions
    );
  }

}
