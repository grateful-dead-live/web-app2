import { Component, OnInit, Input, Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.sass']
})
export class FeedbackComponent implements OnInit {


  @Input() userId: string;
  public feedback: string;


  constructor(private data: DataService, private dialogservice: DialogService, 
    private dialogRef: MatDialogRef<FeedbackComponent>, @Inject(MAT_DIALOG_DATA) private mdata) { }

  ngOnInit(): void {
    this.feedback = '';
  }

  async onClick() {
    
    var m = await this.data.sendFeedback(this.feedback, this.mdata.userid);
    if (m.startsWith('250')) {
      var dm = 'Feedback sent';
      this.dialogservice.openSingleFunction( dm, ["ok"], () => this.dialogRef.close() );
    } else {
      var dm = 'Error sending feedback';
      this.dialogservice.openSingleFunction( dm, ["ok"], () => null );
    }
        
  }


}
