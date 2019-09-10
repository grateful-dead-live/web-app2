import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistDetails } from '../services/types';
import { DataService } from '../services/data.service';

@Component({
  selector: 'gd-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent {
  
  protected artist: ArtistDetails;

  constructor(private data: DataService, private router: Router,
    private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.artist = await this.data.getArtistDetails(params.get('id'));
        console.log(this.artist);
      }
    });
    if (!this.artist) {
      this.router.navigate(['/artist', (await this.data.getRandomArtistId())],
        { replaceUrl: true });
    }
  }

}
