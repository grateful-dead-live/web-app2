import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  title: string,
  options: string[]
}

@Component({
  selector: 'input-dialog',
  templateUrl: './input-dialog.component.html'
})
export class InputDialogComponent {
  constructor(private dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: DialogData) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
  onOkClick(input: string): void {
    this.dialogRef.close(input);
  }
}