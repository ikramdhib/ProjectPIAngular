import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../demande.service';




@Component({
  selector: 'app-demande-form',
  templateUrl: './demande-form.component.html',
  
})
export class DemandeFormComponent implements OnInit {

  demandeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private demandeService: DemandeService
  ) {
    this.demandeForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      etat: [''],
      studentName: [''], // Add more form controls as needed
      studentEmail: [''],
      cvPath: [''],
      lettreMotivation: [''],
      offre: [''],
      // Add more form controls as needed
    });
  }

  ngOnInit(): void {
  }

  submitDemande() {
    if (this.demandeForm.valid) {
      const demandeData = this.demandeForm.value;
      this.demandeService.createDemande(demandeData).subscribe(
        data => console.log('Demande created successfully', data),
        error => console.error('Error creating demande', error)
      );
    }
  }
}
