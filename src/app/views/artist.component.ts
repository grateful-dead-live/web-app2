import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistDetails } from '../services/types';
import { DeadApiService } from '../services/dead-api.service';

@Component({
  selector: 'gd-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent {
  
  protected artist: ArtistDetails;

  constructor(private data: DeadApiService, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.artist = await this.data.getArtistDetails(params.get('id'));
        console.log(this.artist);
      }
    });
  }

}
