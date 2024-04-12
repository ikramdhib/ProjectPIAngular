import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../../demande.service';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  
})
export class DemandeListComponent implements OnInit {

  demandes: any[] = [];

  constructor(private demandeService: DemandeService) { }

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes() {
    this.demandeService.getAllDemandes().subscribe(
      data => this.demandes = data,
      error => console.error('Error fetching demandes', error)
    );
  }
}
