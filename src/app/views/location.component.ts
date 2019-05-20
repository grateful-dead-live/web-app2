import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Location } from '../services/types';

@Component({
  selector: 'gd-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.sass']
})
export class LocationComponent {
  protected location: Location;
  
  constructor(protected data: DataService, private router: Router,
    private route: ActivatedRoute) {}
  
  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.location = await this.data.getLocation(params.get('id'));
      }
      if (!this.location) {
        this.router.navigate(['/location',
          (await this.data.getRandomLocation()).id]);
      }
    });
  }
}
