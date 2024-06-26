import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Type } from './offremodel';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from 'src/app/demande.service';

@Component({
  selector: 'app-listeoffreencadrant',
  templateUrl: './listeoffreencadrant.component.html',
  styleUrls: ['./listeoffreencadrant.component.scss']
})
export class ListeoffreencadrantComponent {
  offres: any[] = [];
  currentOffre: any; // Variable pour stocker l'offre actuelle en cours de modification
  imgURL: any;
  types = Type;
  modalRef: BsModalRef;
  demandes:any[];
  updateForm: FormGroup;
  @ViewChild('updateContent') updateContent: any; // Déclaration de la propriété updateContent de type ViewChild
  @ViewChild('newContactModal', { static: false }) newContactModal?: ModalDirective;
  staticUserId:any;
  currentUser:any;

  constructor(
    private demandeService :DemandeService,
    private http: HttpClient, private toastr: ToastrService, private modalService: BsModalService, private fb: FormBuilder) {
     
    this.initUpdateForm();
  }
  ngOnInit() {
    this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
    if(this.currentUser){
      this.staticUserId=this.currentUser.id;
      this.getAllOffresbyuser(this.staticUserId);
    }
  }

  initUpdateForm() {
    this.updateForm = this.fb.group({
      nomEntreprise: ['', Validators.required],
      nomEncadrant: ['', Validators.required],
      prenomEncadrant: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      datedebut_stage: ['', Validators.required],
      datefin_stage: ['', Validators.required],
      type: ['', Validators.required],
      duree:['', Validators.required],
      hashtags:['', Validators.required]

      
    });

  }

  openUpdateModal(offre: any) {
    this.currentOffre = offre; 
    this.updateForm.patchValue({
      nomEntreprise: offre.nomEntreprise,
      nomEncadrant: offre.nomEncadrant,
      prenomEncadrant: offre.prenomEncadrant,
      email: offre.email,
      description: offre.description,
      datedebut_stage: offre.datedebut_stage,
      datefin_stage: offre.datefin_stage,
      type: offre.type, 
      duree: offre.duree,
      hashtags:offre.hashtags
    });
    this.modalRef = this.modalService.show(this.updateContent); 

  }

  updateOffre() {
    if (this.updateForm.valid && this.currentOffre) {
      const updatedOffre = { ...this.currentOffre, ...this.updateForm.value }; // Fusionnez les données du formulaire avec l'offre actuelle
      this.http.put<any>(`http://localhost:8081/api/offres/update/${this.currentOffre._id}`, updatedOffre).subscribe(
        response => {
          this.toastr.success('Offre mise à jour avec succès', 'Succès');
          this.getAllOffres();
          this.modalRef.hide();
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'offre :', error);
          this.toastr.error('Une erreur s\'est produite lors de la mise à jour de l\'offre', 'Erreur');
        }
      );
    }
  }

  getAllOffresbyuser(userId: string): void {
    this.http.get(`http://localhost:8081/api/offres/byuser/${userId}`)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          this.offres = resultData;
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des offres :', error);
        }
      );
  }

  getAllOffres(): void {
    this.http.get('http://localhost:8081/api/offres')
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          this.offres = resultData;
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des offres :', error);
        }
      );
  }

  deleteOffre(data: any) {
    this.http.delete(`http://localhost:8081/api/offres/delete/${data._id}`, { responseType: 'text' }).subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.toastr.success('Offre supprimée avec succès', 'Succès');
        this.getAllOffres();
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de l\'offre :', error);
        this.toastr.error('Une erreur s\'est produite lors de la suppression de l\'offre', 'Erreur');
      }
    );
  }

  showRequest(exlargeModal: any ,id:any){

    this.demandeService.getRequestWithOffreId(id).subscribe({
      next:(res:any)=>{
        this.demandes=res;
      },
      complete:()=>{
        console.log("DONEEEEEEE");
        this.modalRef = this.modalService.show(exlargeModal, { class: 'modal-xl' });
      }
    })
  }


  
}
