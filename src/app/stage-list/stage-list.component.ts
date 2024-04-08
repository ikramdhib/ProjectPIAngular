import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/User';
import { Stage } from 'src/Stage'; // Assurez-vous d'importer le modèle Stage

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.scss']
})
export class StageListComponent implements OnInit {
  users: User[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsersWithStages();
  }

  fetchUsersWithStages(): void {
    this.http.get<any[]>('http://localhost:8081/withStages').subscribe(data => {
      this.users = data.map(user => {
        return {
          id: user.id,
          lastName: user.lastName,
          firstName: user.firstName,
          login: user.login,
          password: user.password,
          resume: user.resume,
          pic: user.pic,
          unvId: user.unvId,
          phoneNumber: user.phoneNumber,
          emailPro: user.emailPro,
          company: user.company,
          stage: user.stage.map(stage => {
            return {
              id: stage.id,
              journal: stage.journal,
              certificate: stage.certificate,
              report: stage.report,
              startAt: new Date(stage.startAt),
              endAt: new Date(stage.endAt),
              encadrant: stage.encadrant,
              etudiant: stage.etudiant
            };
          })
        };
      });
    });
  }
}
