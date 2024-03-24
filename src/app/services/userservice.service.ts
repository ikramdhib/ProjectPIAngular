import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:8081/api/user'; 

  private apiUrl2 = 'http://localhost:8081/api/notes'; 

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

  assignNoteToStudent(studentId: string, encadrantId: string, note: any): Observable<any> {
    const url = `${this.apiUrl2}/assign/${studentId}/${encadrantId}`;
    return this.http.post<any>(url, note);
  }

  getNotesByStudentId(studentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/student/${studentId}`);
  }

}

