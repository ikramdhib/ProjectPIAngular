import { Component, ElementRef, ViewChild, AfterViewInit, AfterViewChecked, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttestationServiceService } from 'src/app/attestation-service.service';
import * as html2pdf from 'html2pdf.js';
import SignaturePad from 'signature_pad';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-attestation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.scss']
})
export class AttestationComponent implements AfterViewInit, AfterViewChecked {
  currentDate: string;
  defaultEncadrantId = '65fb3f9b12606c2f28507ae8';
  attestationText: string = ""; // Assurez-vous de l'initialiser avec le contenu de l'attestation

  signatureImageSrc: string | null = null; // Variable pour stocker la source de l'image de la signature

  @ViewChild('signaturePad') signaturePadElement!: ElementRef<HTMLCanvasElement>;
  signaturePadInstance: SignaturePad;

  constructor(private http: HttpClient,private attestationService: AttestationServiceService, private route: ActivatedRoute,private toastr: ToastrService) {
    // Initialiser currentDate avec la date d'aujourd'hui au format souhaité
    const today = new Date();
    this.currentDate = today.toLocaleDateString('fr-FR');
  }
  
  ngOnInit(): void {
    // Récupérer l'ID du stage à partir de l'URL
    this.stageId = this.route.snapshot.paramMap.get('stageId');
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

  stageId: string; // Définir la propriété stageId

  private baseUrl = 'http://localhost:8081'; // Remplacez ceci par l'URL de votre backend
  downloadPdf(pdfBlob: Blob): void {
    const fileURL = URL.createObjectURL(pdfBlob);

    // Créer un lien <a> pour télécharger le PDF
    const a = document.createElement('a');
    a.href = fileURL;
    a.download = 'attestation.pdf';
    document.body.appendChild(a);
    a.click();

    // Nettoyer après le téléchargement
    document.body.removeChild(a);
    URL.revokeObjectURL(fileURL);
  }
  onSaveAttestation() {
    // Appeler la méthode pour générer et enregistrer le PDF en utilisant this.stageId
    const attestationContent = '';
    this.generatePdf(this.stageId, attestationContent, (pdfBlob) => {
      // Actions supplémentaires à effectuer une fois que le PDF est généré et enregistré
      console.log('PDF généré et enregistré avec succès.');
    });
}

  generatePdf(stageId: string, attestation: string, callback: (pdfBlob: Blob) => void) {
    // Récupérer l'élément contenant le contenu à convertir en PDF par son ID
    const element = document.getElementById('contentToConvert');

    // Vérifier si l'élément existe avant de continuer
    if (element) {
      // Ajouter le contenu de l'attestation au début de l'élément
      element.insertAdjacentHTML('afterbegin', attestation);

      const options = {
        margin: 1,
        filename: 'attestation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // Utiliser html2pdf pour générer le PDF à partir du contenu de l'élément
      html2pdf().from(element).set(options).outputPdf('blob').then((pdfBlob) => {
        callback(pdfBlob);

        // Envoyer le fichier PDF au serveur
        const formData = new FormData();
        formData.append('pdf', pdfBlob);

        this.http.post(`${this.baseUrl}/stages/${stageId}/upload-pdf`, formData)
          .subscribe(
            () => console.log('Fichier PDF enregistré avec succès dans la base de données.'),
            (error) => console.error('Erreur lors de l\'enregistrement du fichier PDF dans la base de données :', error)
          );

        // Retirer le contenu de l'attestation ajouté précédemment
        element.removeChild(element.firstChild);

        // Ajouter un log pour afficher le fichier PDF après la conversion
        console.log("Fichier PDF après conversion :", pdfBlob);
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

}