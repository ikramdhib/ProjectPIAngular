import { Component, ElementRef, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttestationServiceService } from 'src/app/attestation-service.service';
import * as html2pdf from 'html2pdf.js';
import SignaturePad from 'signature_pad';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.scss']
})
export class AttestationComponent implements AfterViewInit, AfterViewChecked {
  currentDate: string;
  defaultEncadrantId = '65d7b5d7025a231f20900abb';
  attestationText: string = ""; // Assurez-vous de l'initialiser avec le contenu de l'attestation

  
  logoFile: File | null = null; // Variable pour stocker le logo de la société
  signatureImageSrc: string | null = null; // Variable pour stocker la source de l'image de signature

  @ViewChild('signaturePad') signaturePadElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pdfInput') pdfInput: ElementRef;
  @ViewChild('signaturePad') signaturePad: ElementRef<HTMLCanvasElement>;
  signaturePadInstance: SignaturePad;

  constructor(private attestationService: AttestationServiceService, private route: ActivatedRoute,private toastr: ToastrService) {
    // Initialiser currentDate avec la date d'aujourd'hui au format souhaité
    const today = new Date();
    this.currentDate = today.toLocaleDateString('fr-FR');
   
  
  
  }

  ngAfterViewInit(): void {
    // Initialise SignaturePad avec le canevas
    this.signaturePadInstance = new SignaturePad(this.signaturePadElement.nativeElement);
  }

  ngAfterViewChecked(): void {
    // Mettre à jour la source de l'image de la signature après chaque vérification de la vue
    this.updateSignatureImageSrc();
  }

  clearSignature(): void {
    this.signaturePadInstance.clear();
  }

  saveAttestation(): void {
    const stageId = this.route.snapshot.paramMap.get('stageId');
    const studentId = this.route.snapshot.paramMap.get('studentId');
    const encadrantId = this.defaultEncadrantId;
  
    if (stageId && studentId && this.signaturePadInstance) {
      const signatureDataUrl = this.signaturePadInstance.toDataURL();
      const formData = new FormData();
  
      // Ajouter le logo à FormData s'il est défini
      if (this.logoFile) {
        formData.append('logo', this.logoFile);
      }
  
      // Ajouter la signature à FormData
      formData.append('signature', signatureDataUrl);
  
      // Appel à generatePdf() pour générer le PDF
      this.generatePdf(formData, (pdfBlob) => {
        formData.append('pdfFile', pdfBlob, 'attestation.pdf');
        formData.append('htmlContent', this.attestationText);
  
        // Appel à saveAttestation() pour enregistrer l'attestation
        this.attestationService.addAttestationToStage(stageId, encadrantId, studentId, formData, this.attestationText)
          .subscribe(
            response => {
              console.log('Attestation ajoutée avec succès !', response);
            },
            error => {
              console.error('Erreur lors de l\'ajout de l\'attestation :', error);
              this.toastr.success('Attestation ajouté avec succées');
            }
          );
      });
    } else {
      console.error('Impossible d\'ajouter l\'attestation : données manquantes.');
    }
  }

  // Méthode appelée lorsqu'un fichier est sélectionné
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.logoFile = event.target.files[0];
    }
  }
  
  generatePdf(formData: FormData, callback: (pdfBlob: Blob) => void): void {
    // Récupérer l'élément contenant le contenu à convertir en PDF par son ID
    const element = document.getElementById('contentToConvert');
  
    // Vérifier si l'élément existe avant de continuer
    if (element) {
      const options = {
        margin: 1,
        filename: 'attestation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
  
      // Utiliser html2pdf pour générer le PDF à partir du contenu de l'élément
      html2pdf().from(element).set(options).outputPdf('blob').then((pdfBlob: Blob) => {
        callback(pdfBlob);
      });
    } else {
      console.error('Impossible de trouver l\'élément pour la conversion en PDF.');
    }
  }
  
  updateSignatureImageSrc(): void {
    // Mettre à jour la source de l'image de la signature de manière asynchrone
    setTimeout(() => {
      if (this.signaturePadInstance) {
        this.signatureImageSrc = this.signaturePadInstance.toDataURL();
      } else {
        this.signatureImageSrc = null;
      }
    });
  }
  

  getLogoUrl(): string {
    if (this.logoFile) {
      return URL.createObjectURL(this.logoFile);
    } else {
      return ''; // Retourne une chaîne vide si le logo n'est pas défini
    }
  }
  downloadAttestation(): void {
    const stageId = this.route.snapshot.paramMap.get('stageId');
    const studentId = this.route.snapshot.paramMap.get('studentId');
    const encadrantId = this.defaultEncadrantId;
  
    if (stageId && studentId) {
      this.attestationService.downloadAttestation(stageId, encadrantId, studentId).subscribe(
        (response: any) => {
          // Créer un objet URL pour le blob PDF
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
  
          // Créer un lien <a> pour télécharger le PDF
          const a = document.createElement('a');
          a.href = fileURL;
          a.download = 'attestation.pdf';
          document.body.appendChild(a);
          a.click();
  
          // Nettoyer après le téléchargement
          document.body.removeChild(a);
          URL.revokeObjectURL(fileURL);
        },
        error => {
          console.error('Erreur lors du téléchargement de l\'attestation :', error);
          this.toastr.error('Erreur lors du téléchargement de l\'attestation.');
        }
      );
    } else {
      console.error('Impossible de télécharger l\'attestation : données manquantes.');
    }
  }
  
}
