import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../demande.service';
import { ToastrService } from 'ngx-toastr';
import { Offre } from '../models/offre';
import { User } from '../models/user'; // Assurez-vous d'importer votre modèle d'utilisateur

@Component({
  selector: 'app-demande-form',
  templateUrl: './demande-form.component.html',
})
export class DemandeFormComponent implements OnInit {
  demandeForm: FormGroup;
  offres: Offre[] = [];
  user: User = { userId: '65d5f4bfb6165c22e70320ec', lastName: 'Doe', firstName: 'John', login: 'johndoe' }; // Utilisateur statique avec ID "123"
  createdDemande: any;
  selectedFile: File | null = null;
  selectedFile1: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private demandeService: DemandeService,
    private toastr: ToastrService
  ) {
    this.demandeForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      etat: [''],
      studentName: [''],
      studentEmail: [''],
      cvPath: [''],
      lettreMotivation: [''],
      offre: ['', Validators.required], // Sélection de l'offre
      user: ['65d5f4bfb6165c22e70320ec', Validators.required], // Utilisateur statique avec ID "123"
    });
  }

  get f() {
    return this.demandeForm.controls;
  }

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres(): void {
    this.demandeService.getOffres().subscribe((offres: Offre[]) => {
      this.offres = offres;
    });
  }

  submitDemande() {
    if (this.demandeForm.valid) {
      const formData = new FormData();
      formData.append('titre', this.demandeForm.get('titre')?.value);
      formData.append('description', this.demandeForm.get('description')?.value);
      formData.append('etat', this.demandeForm.get('etat')?.value);
      formData.append('studentName', this.demandeForm.get('studentName')?.value);
      formData.append('studentEmail', this.demandeForm.get('studentEmail')?.value);
      formData.append('idOffre', this.demandeForm.get('offre')?.value);
      formData.append('userId', this.user.userId); // Utilisateur statique avec ID "123"

      formData.append('cvPath', this.selectedFile!!, this.selectedFile?.name);
      formData.append('lettreMotivation', this.selectedFile1!!, this.selectedFile1?.name);

      this.demandeService.createDemande(formData).subscribe({
        next: (data) => {
          // Traitez la réponse comme vous le souhaitez
          this.toastr.success('Demande ajoutée avec succès', 'Succès');
        },
        error: (err: any) => {
          console.log(err);
          this.toastr.success('Une erreur s\'est produite', 'Erreur');
        },
      });
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[event.target.files.length - 1] as File;
    }
  }

  onFileSelected1(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile1 = event.target.files[event.target.files.length - 1] as File;
    }
  }
}
