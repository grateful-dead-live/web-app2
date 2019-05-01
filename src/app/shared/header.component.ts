import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class ShowComponent {
  protected image: SafeStyle;
  protected title: string;
  protected subtitle: string;
  
  constructor(private route: ActivatedRoute) {
    this.image = this.route.snapshot.paramMap.get('image');
    this.title = this.route.snapshot.paramMap.get('title');
    this.subtitle = this.route.snapshot.paramMap.get('subtitle');
  }

}
