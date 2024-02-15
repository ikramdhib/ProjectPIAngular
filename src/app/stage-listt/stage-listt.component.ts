import { Component } from '@angular/core';
import { StageService } from '../stage.service';

@Component({
  selector: 'app-stage-listt',
  templateUrl: './stage-listt.component.html',
  styleUrls: ['./stage-listt.component.scss']
})
export class StageListtComponent {
  stages: any[] = [];

  constructor(private stageService: StageService) { }

  ngOnInit(): void {
    this.loadStages();
   
  }

  loadStages() {
    this.stageService.getAllStagesWithUserNames().subscribe(data => {
      this.stages = []; // Réinitialisez le tableau des stages
      Object.entries(data).forEach(([info, userName], index) => {
        // Utilisez des expressions régulières pour extraire les détails du stage
        const stageDetails = this.extractStageDetails(info);
        if (stageDetails) {
          const stage = {
            id: index + 1,
            ...stageDetails,
            userName: userName
          };
          this.stages.push(stage); // Ajoutez le stage au tableau des stages
        }
      });
    });
  }
  
  // Méthode pour extraire les détails du stage à partir de la chaîne info
  extractStageDetails(info: string): any {
    // Expression régulière pour extraire les informations du stage
    const regex = /id=(.*?), startAt=(.*?), endAt=(.*?), type=(.*?), nomCoach=(.*?), prenomCoach=(.*?), numCoach=(.*?), emailCoach=(.*?), user=(.*?)\)/;
    const match = info.match(regex);
    if (match && match.length === 10) {
      return {
        id: match[1],
        startAt: match[2],
        endAt: match[3],
        type: match[4],
        nomCoach: match[5],
        prenomCoach: match[6],
        numCoach: match[7],
        emailCoach: match[8]
      };
    }
    return null;
  }
  
  }

