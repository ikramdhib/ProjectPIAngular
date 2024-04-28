import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../../demande.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Offre } from '../../models/offre';
import { User } from 'src/app/models/user';

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
  currentUser:any;
  userId:any;
  offreId:any;


  constructor(
    private formBuilder: FormBuilder,
    private demandeService: DemandeService,
    private toastr: ToastrService,
    private router : ActivatedRoute
  ) {
    
  }

  get f() {
    return this.demandeForm.controls;
  }

  ngOnInit(): void {
    this.loadOffres();
    this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
    if(this.currentUser){
      this.userId=this.currentUser.id;
      this.offreId = this.router.snapshot.params['id'];
      console.log("id offre " , this.offreId)
      this.demandeForm = this.formBuilder.group({
        titre: ['', Validators.required],
        description: ['', Validators.required],
        etat: [''],
        studentName: [this.currentUser.firstName+'  '+this.currentUser.lastName],
        studentEmail: [this.currentUser.login],
        cvPath: [''],
        lettreMotivation: [''],
        offre: [''], // Sélection de l'offre
        userId: [''], // Utilisateur statique avec ID "123"
      });
    }
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
      formData.append('idOffre', this.offreId);
      formData.append('userId', this.userId); // Utilisateur statique avec ID "123"

      formData.append('cvPath', this.selectedFile!!, this.selectedFile?.name);
      formData.append('lettreMotivation', this.selectedFile1!!, this.selectedFile1?.name);

      this.demandeService.createDemande(formData).subscribe({
        next: (data) => {
          console.log(data);
          // Traitez la réponse comme vous le souhaitez
          this.toastr.success('Demande ajoutée avec succès', 'Succès');
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