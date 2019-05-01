import { Component } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DeadEventInfo } from '../dead-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent {
  
  protected event: DeadEventInfo;
  protected backgroundImage: SafeStyle;
  
  constructor(private data: DataService, private sanitizer: DomSanitizer) {
    
  }
  
  async ngOnInit() {
    this.event = await this.data.getEvent();
    const imageUrl = 'url('+this.event.location.image+')';
    this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(imageUrl);
  }

}
