import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { VenueDetails } from '../services/types';



@Component({
  selector: 'gd-mapselect',
  templateUrl: './mapselect.component.html',
  //styleUrls: ['./mapselect.component.sass']
})

export class MapSelectComponent {

  constructor(private data: DataService, private sanitizer: DomSanitizer,
  private router: Router, private route: ActivatedRoute) {}

  protected venues: VenueDetails[];
  protected test: number;
  async ngOnInit() {


    
    //this.venues = await this.data.getVenueCoordinates();
    //console.log(this.venues);
     



  }



}
