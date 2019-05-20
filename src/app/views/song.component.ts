import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Song } from '../services/types';
import { DataService } from '../services/data.service';

@Component({
  selector: 'gd-song',
  templateUrl: './song.component.html'
})
export class SongComponent {
  
  protected song: Song;
  
  constructor(private data: DataService,
    private router: Router, private route: ActivatedRoute) {}
  
  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.song = await this.data.getSong(params.get('id'));
      }
      if (!this.song) {
        this.router.navigate(['/show', await this.data.getRandomEventId()]);
      }
    });
  }
}
