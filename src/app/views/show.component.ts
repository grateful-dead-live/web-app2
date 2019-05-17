import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DeadEventDetails } from '../services/types';
import { DataService } from '../services/data.service';

@Component({
  selector: 'gd-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent {
  
  protected event: DeadEventDetails;
  protected recordingUrls: SafeStyle[];
  
  constructor(private data: DataService, private sanitizer: DomSanitizer,
    private router: Router, private route: ActivatedRoute, private titleService: Title) {}
  
  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.event = await this.data.getEvent(params.get('id'));
        this.recordingUrls = this.event.recordings.map(i => 
          this.sanitizer.bypassSecurityTrustResourceUrl("https://archive.org/embed/"+i+"&playlist=1")
        );
        this.titleService.setTitle(this.event.location.name + ", " + this.event.date);
      } else {
        this.router.navigate(['/show', await this.data.getRandomEventId()]);
      }
    });
  }

}
