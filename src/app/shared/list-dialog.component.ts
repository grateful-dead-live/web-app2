import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string,
  options: string[]
}

@Component({
  selector: 'list-dialog',
  templateUrl: './list-dialog.component.html'
})
export class ListDialogComponent {
  constructor(private dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: DialogData) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
  onItemClick(item: string): void {
    this.dialogRef.close(item);
  }
}