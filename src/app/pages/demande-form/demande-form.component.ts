import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../../demande.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';




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
    private demandeService: DemandeService,
    private toastr: ToastrService,
    private route: ActivatedRoute,

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

  idOffre:any;
get f(){
  
  return this.demandeForm.controls}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idOffre = params['id'];
    });
  }

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

  test !:boolean
  submitDemande() {
    if (this.demandeForm.valid) {
      const formData = new FormData();
      formData.append('titre', this.demandeForm.get('titre')?.value);
      formData.append('description', this.demandeForm.get('description')?.value);
      formData.append('etat', this.demandeForm.get('etat')?.value);
      formData.append('studentName', this.demandeForm.get('studentName')?.value);
      formData.append('studentEmail', this.demandeForm.get('studentEmail')?.value);
      formData.append('idOffre', this.idOffre);
  
      // Append CV and Lettre Motivation files
      formData.append('cvPath', this.selectedFile!!, this.selectedFile?.name);
      formData.append('lettreMotivation', this.selectedFile1!!, this.selectedFile1?.name);
  
      const demandeData = this.demandeForm.value;
  
      this.demandeService.createDemande(formData).subscribe({
        next: (data) => {
          // Assuming data contains information about the created demande
          this.createdDemande = data;
        },
        error: (err: any) => {
          console.log(err);
          this.toastr.success('Demande ajoutée avec succès', 'Succès');
        },
      });
    }
  }
  
}