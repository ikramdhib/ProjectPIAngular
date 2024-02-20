import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../demande.service';




@Component({
  selector: 'app-demande-form',
  templateUrl: './demande-form.component.html',
})
export class DemandeFormComponent implements OnInit {
  demandeForm: FormGroup;
  createdDemande: any; // Assuming you have a variable to store the created demande

  constructor(
    private formBuilder: FormBuilder,
    private demandeService: DemandeService
  ) {
    this.demandeForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      etat: [''],
      studentName: [''],
      studentEmail: [''],
      cvPath: [''],
      lettreMotivation: [''],
      offre: [''],
    });
  }

  ngOnInit(): void {}

  submitDemande() {
    if (this.demandeForm.valid) {
      const demandeData = this.demandeForm.value;
      this.demandeService.createDemande(demandeData).subscribe(
        (data) => {
          console.log('Demande created successfully', data);
          this.createdDemande = data; // Set the created demande variable
        },
        (error) => console.error('Error creating demande', error)
      );
    }
  }
}