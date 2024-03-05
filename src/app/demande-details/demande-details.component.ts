 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandeService } from '../demande.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',

})
export class DemandeDetailsComponent implements OnInit {

  demande: any;
  lettreMotivationUrl: SafeResourceUrl;
  cvPathUrl: SafeResourceUrl;
  
  constructor(
    private route: ActivatedRoute,
    private demandeService: DemandeService,
    private sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const demandeId = params['id'];
      this.loadDemandeDetails(demandeId);
    });
  }
  loadDemandeDetails(demandeId: string) {
    this.demandeService.getDemandeById(demandeId).subscribe(
      data => {
        this.demande = data;
  
        // Sanitize URLs
        this.demande.lettreMotivation = this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/cvs/' + this.demande.lettreMotivation);
        this.demande.cvPath = this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/cvs/' + this.demande.cvPath);
      },
      error => console.error('Error fetching demande details', error)
    );
  }
  
}
