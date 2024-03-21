import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-dialog-component.component.html',
  styleUrl: './task-dialog-component.component.scss'
})
export class TaskDialogComponentComponent {
  tasks: any[] = [];

  constructor(public dialogRef: MatDialogRef<TaskDialogComponentComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.tasks = this.data.tasks;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
