import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DeadEventDetails } from '../services/types';
import { DataService } from '../services/data.service';

@Component({
  selector: 'gd-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent {
  
  protected event: DeadEventDetails;
  
  constructor(private data: DataService, private router: Router,
    private route: ActivatedRoute, private titleService: Title) {}
  
  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.event = await this.data.getEvent(params.get('id'));
        this.titleService.setTitle(this.event.location.name + ", " + this.event.date);
      } else {
        this.router.navigate(['/show', await this.data.getRandomEventId()]);
      }
    });
  }

}
