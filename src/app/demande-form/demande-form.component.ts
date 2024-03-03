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
  selectedFile: File | null = null;
  selectedFile1: File | null = null;
  
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
get f(){
  
  return this.demandeForm.controls}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
     
      this.selectedFile = event.target.files[
        event.target.files.length - 1
      ] as File;
    }
  }

  onFileSelected1(event: any) {
    if (event.target.files.length > 0) {
     
      this.selectedFile1 = event.target.files[
        event.target.files.length - 1
      ] as File;
    }
  }

  submitDemande() {

    if (this.demandeForm.valid) {
      const formData = new FormData();
      formData.append('titre', this.demandeForm.get('titre')?.value);
      formData.append('description', this.demandeForm.get('description')?.value);

      formData.append('etat', this.demandeForm.get('etat')?.value);

      formData.append('studentName', this.demandeForm.get('studentName')?.value);
      formData.append('studentEmail', this.demandeForm.get('studentEmail')?.value);


    formData.append('cvPath', this.selectedFile!!, this.selectedFile?.name);
    formData.append('lettreMotivation', this.selectedFile!!, this.selectedFile?.name);

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