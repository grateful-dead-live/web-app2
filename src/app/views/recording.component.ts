import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { RecordingDetails, DeadEventInfo } from '../services/types';

@Component({
  selector: 'gd-recording',
  templateUrl: './recording.component.html'
})
export class RecordingComponent {
  protected recording: RecordingDetails;
  protected event: DeadEventInfo;
  
  constructor(protected data: DataService, private router: Router,
    private route: ActivatedRoute) {}
  
  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.recording = await this.data.getRecording(params.get('id'));
        this.event = await this.data.getEventInfoForRecording(this.recording.id);
      }
      if (!this.recording) {
        this.router.navigate(['/recording', (await this.data.getRandomRecording()).id],
          { replaceUrl: true });
      }
    });
  }
}
