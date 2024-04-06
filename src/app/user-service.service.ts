import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:8081'; 

  constructor(private http: HttpClient) { }

  getStudentsBySupervisor(encadrantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/students/${encadrantId}`).pipe(
      map((students: any[]) => {
        // Pour chaque étudiant, récupérez l'ID du stage associé
        return students.map(student => {
          // Supposons que vous récupériez l'ID du stage à partir de la propriété 'stageId' de l'objet 'student'
          const stageId = student.stageId; // Assurez-vous que cette propriété correspond à celle utilisée dans votre backend
          return { ...student, stageId };
        });
      })
    );
  }
  validateStudent(studentId: string) {
    return this.http.put(`${this.apiUrl}/${studentId}/validate`, {});
  }

  getStudentsByAllStages(serviceId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stages/students/${serviceId}`);
  }
  rejectStudent(studentId: string, rejectionReason: string): Observable<any> {
    const url = `${this.apiUrl}/${studentId}/reject/${rejectionReason}`;
    return this.http.post(url, null); // Nous n'envoyons pas de données dans le corps de la requête car nous passons la raison de rejet dans l'URL
  }

  }

