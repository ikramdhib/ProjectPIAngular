import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandeService } from '../demande.service';

@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.css']
})
export class DemandeDetailsComponent implements OnInit {

  demande: any;

  constructor(
    private route: ActivatedRoute,
    private demandeService: DemandeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const demandeId = params['id'];
      this.loadDemandeDetails(demandeId);
    });
  }

  loadDemandeDetails(demandeId: string) {
    this.demandeService.getDemandeById(demandeId).subscribe(
      data => this.demande = data,
      error => console.error('Error fetching demande details', error)
    );
  }
}
