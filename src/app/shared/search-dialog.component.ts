import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DEBUG } from '../config';

console.log = function(s){
  if (!DEBUG) {
    console.warn(s);
  }; 
};

export interface DialogData {
  title: string,
  options: string[]
}

@Component({
  selector: 'search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.sass']
})
export class SearchDialogComponent {

  result: any;
  searchString: string;

  constructor(private dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data ) {
      //this.result = data.result; //this.sortItems(data.result);
      this.result = this.sortItems(data.result);
      this.searchString = data.searchString;
    }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
  onItemClick(item: string): void {
    this.dialogRef.close(item);
  }

  sortItems(r){
    var s = { 'show': [], 'venue': [], 'song': [] };
    r.forEach( i => {
      s[i.type].push([i.title, i.uri])
    })
    Object.keys(s).forEach(k => {
      s[k].sort();
    })
    console.log(s)
    return s
  }
}