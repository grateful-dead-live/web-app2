import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { RecordingDetails } from '../services/types';

@Component({
  selector: 'gd-recording',
  templateUrl: './recording.component.html'
})
export class RecordingComponent {
  protected recording: RecordingDetails;
  protected location: string;
  
  constructor(protected data: DataService, private router: Router,
    private route: ActivatedRoute) {}
  
  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        console.log(params.get('id'))
        this.recording = await this.data.getRecording(params.get('id'));
        console.log(this.recording)
      }
      if (!this.recording) {
        this.router.navigate(['/recording', (await this.data.getRandomRecording()).id],
          { replaceUrl: true });
      }
    });
  }
}
