import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Performer } from '../services/types';
import { DeadApiService } from '../services/dead-api.service';

@Component({
  selector: 'gd-musician',
  templateUrl: './musician.component.html',
})
export class MusicianComponent {
  
  protected musician: Performer;

  constructor(private data: DeadApiService, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      console.log(params)
      if (params.has('sameAs')) {
        this.musician = await this.data.getPerformer(params.get('sameAs'));
        console.log(this.musician);
      }
    });
  }

}
