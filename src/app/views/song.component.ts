import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Song } from '../services/types';
import { DataService } from '../services/data.service';
import { DeadApiService } from '../services/dead-api.service';

@Component({
  selector: 'gd-song',
  templateUrl: './song.component.html'
})
export class SongComponent {
  
  protected song: Song;
  private selectedRec ;
  private etreeinfo;
 
  
  constructor(private data: DataService, private apiService: DeadApiService,
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


  /*recordingSelected(){
    this.apiService.getEtreeInfo(this.selectedRec.id).then(e => this.etreeinfo = e);
  }
  */

  selectChangeHandler (event: any) {
    //update the ui
    this.selectedRec = event.target.value;
    this.apiService.getEtreeInfo(this.selectedRec).then(e => this.etreeinfo = e);
    
  }

}
