import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import SignaturePad from 'signature_pad';
import { AttestationServiceService } from 'src/app/attestation-service.service';

@Component({
  selector: 'app-attestation-stage',
  standalone: true,
  imports: [],
  templateUrl: './attestation-stage.component.html',
  styleUrl: './attestation-stage.component.scss'
})
export class AttestationStageComponent {
  signatureDataUrl: string = '';
  saving: boolean = false;

  @ViewChild('signatureCanvas', { static: true }) signatureCanvas: ElementRef<HTMLCanvasElement>;
  signaturePad: any;

  constructor(private http: HttpClient,private attestationService: AttestationServiceService,  @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement);
  }

  clearSignature(): void {
    this.signaturePad.clear();
  }

  saveSignature(): void {
    this.signatureDataUrl = this.signaturePad.toDataURL();
  }

  saveAttestation(): void {
    this.saving = true;
    const imageDataUrl = this.signaturePad.toDataURL();

    this.attestationService.addAttestationToStage(this.data.student.stageId, this.data.student.encadrantId, this.data.student.etudiantId, imageDataUrl).subscribe({
      next: () => {
        console.log('Attestation added successfully');
        this.saving = false;
      
      },
      error: (error) => {
        console.error('Failed to add attestation', error);
        this.saving = false;
      }
    });
  }
  
}
