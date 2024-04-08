import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reason-dialog',
  standalone: true,
  imports: [FormsModule,   MatDialogModule,
    MatFormFieldModule, // Assurez-vous que MatFormFieldModule est importé
    MatInputModule],
  templateUrl: './reason-dialog.component.html',
  styleUrl: './reason-dialog.component.scss'
})
export class ReasonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reason: string }
  ) { }

  closeDialog(): void {
    this.dialogRef.close(this.data.reason);
  }
}