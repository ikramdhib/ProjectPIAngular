import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Assurez-vous d'importer FormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importez MatFormFieldModule

@Component({
  selector: 'app-rejection-reason-dialog',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule],
  templateUrl: './rejection-reason-dialog.component.html',
  styleUrl: './rejection-reason-dialog.component.scss'
})
export class RejectionReasonDialogComponent {
  rejectionReason: string = '';

  constructor(
    public dialogRef: MatDialogRef<RejectionReasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmRejection(): void {
    this.dialogRef.close(this.rejectionReason);
  }
}
