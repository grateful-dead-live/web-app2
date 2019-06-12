import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DeadEventDetails } from '../services/types';
import { DataService } from '../services/data.service';
import { formatDate } from '../services/util';

@Component({
  selector: 'gd-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent {
  
  protected event: DeadEventDetails;
  protected recordingUrls: SafeStyle[];
  protected showPhotos: string[];
  protected eventImage: string;
  
  constructor(private data: DataService, private sanitizer: DomSanitizer,
    private router: Router, private route: ActivatedRoute) {}
  
  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.event = await this.data.getEventDetails(params.get('id'));
        this.event.date = formatDate(this.event.date);
        this.recordingUrls = this.event.recordings.map(i => 
          this.sanitizer.bypassSecurityTrustResourceUrl("https://archive.org/embed/"+i+"&playlist=1")
        );
        this.showPhotos = this.event.artifacts
          .filter(a => a.type == 'photo').slice(0, 3).map(a => a.image);
        const poster = this.event.artifacts.filter(a => a.type == 'poster')[0];
        const pass = this.event.artifacts.filter(a => a.type == 'pass')[0];
        const ticket = this.event.artifacts.filter(a => a.type == 'ticket')[0];
        this.eventImage = this.showPhotos.length ? this.showPhotos[0]
          : poster ? poster.image : pass ? pass.image : ticket ? ticket.image
          : this.event.location.thumbnail;
        console.log(this.event.performers)
      } else {
        this.router.navigate(['/show', await this.data.getRandomEventId()],
          { replaceUrl: true });
      }
    });
  }

}
