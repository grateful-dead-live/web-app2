import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ListDialogComponent } from '../shared/list-dialog.component';
import { InputDialogComponent } from '../shared/input-dialog.component';
import { DataService } from '../services/data.service';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog, private data: DataService) {}
  
  async openMultiFunction(title: string, options: string[], funcs: Function[]) {
    this.open(title, options).subscribe(result => {
     if (result) {funcs[options.indexOf(result)]() }
  });
  }
  
  async openSingleFunction(title: string, options: string[], func: (s: string) => any) {
    this.open(title, options).subscribe(result => func(result));
  }
  
  private open(title: string, options: string[]) {
    return this.dialog.open(ListDialogComponent,
      this.getDialogConfig(title, options)).afterClosed();
  }
  
  private getDialogConfig(title: string, items: string[]) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { title: title, items: items };
    return dialogConfig;
  }

  
  async openInputDialog(callback) {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '250px',
      data: {input: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      callback(result);
    });
  }



}